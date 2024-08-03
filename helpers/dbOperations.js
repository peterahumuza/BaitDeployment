import axios from "axios";
import { PDFDocument } from 'pdf-lib';
import { db, storage } from "../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  query,
  updateDoc,
  doc,
  where,
  getDocs,
  orderBy, limit,
  deleteDoc,
} from "firebase/firestore";
import fileDownload from "js-file-download";
import {
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";

import JSZip from "jszip";
import { create } from "d3";

function getRandomBytes() {
  // Generate two random numbers between 0 and 255
  const byte1 = Math.floor(Math.random() * 256);
  const byte2 = Math.floor(Math.random() * 256);

  // Convert to hexadecimal and pad with leading zeroes if necessary
  const hexByte1 = byte1.toString(16).padStart(2, '0');
  const hexByte2 = byte2.toString(16).padStart(2, '0');

  // Concatenate the two hex strings
  return hexByte1 + hexByte2;
}


function generateUID(currentUser, userData) {
  const timestamp = new Date().getTime(); // Current time in milliseconds
  const digest = getRandomBytes(); // Random 4-byte digest
  return `${currentUser}_${digest}_${timestamp}`;
}



function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const readDocxFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const getPageCountFromDocx = async (file) => {
  try {
    const arrayBuffer = await readDocxFileAsArrayBuffer(file);
    const jszip = new JSZip();
    const docxZip = await jszip.loadAsync(arrayBuffer);
    const appXml = await docxZip.file("docProps/app.xml").async("string");

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(appXml, "application/xml");
    const pagesNode = xmlDoc.getElementsByTagName("Pages")[0];
    
    if (pagesNode) {
      const pageCount = parseInt(pagesNode.textContent, 10);
      console.log("Page count:", pageCount);
      return pageCount+1;
    } else {
      console.log("Page count not found.");
      return 1;
    }
  } catch (error) {
    console.error("Error reading page count from .docx:", error);
    return 1;
  }
};

export async function getFiles(currentUser) {
  const q = query(
    collection(db, "files"),
    where("userId", "==", currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length !== 0) {
    return querySnapshot.docs.map(doc => ({
      name: doc.data().name, 
      size: doc.data().size, 
      timestamp: doc.data().createdAt,
    }));
  } else {
    return [];
  }
}

export async function getFilesCount(currentUser) {
  const q = query(
    collection(db, "files"),
    where("userId", "==", currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length !== 0) {
    return querySnapshot.docs.length;
  } else {
    return 0;
  }

}

export async function getOrgScore(organization) {
  const q = query(
    collection(db, "users"),
    where("organization", "==", organization)
  );
  
  const querySnapshot = await getDocs(q);
  let totalScore = 0;

  querySnapshot.forEach((doc) => {
    totalScore += doc.data().score || 0; // Add the user's score to the total, defaulting to 0 if the score is undefined
  });

  return totalScore;
}

export async function storeFeedbackInDatabase(
  currentUser,
  UserData,
  feedback,
  setMessages,
  setError
){
  await addDoc(collection(db, "feedback"), {
    userId: currentUser.uid,
    userName: UserData.name,
    feedback: feedback,
    createdAt: serverTimestamp(),
    userOrganization: UserData.organization,
    userCountry: UserData.country
  }).then(() => {
    setMessages(["Feedback stored !"]);
    return setError(false);
  })
  .catch((e) => {
    console.log(e)
    setMessages(["Failed to index feedback in database "]);
    return setError(true);
  });
}

export async function storeContributionInDatabase(
  currentUser,
  userData,
  question,
  firstAnswer,
  secondAnswer,
  evaluation,
  vote,
  tags,
  idealAnswer,
  secondEvaluation,
  secondLikertCount,
  scoreIncrease,
  userRecordsId,
  likertCount,
  numberOfTags,
  setUserData,
  setMessages,
  setError

){
  const actualScore = userData.score; 

  await addDoc(collection(db, "contributions"), {
    contributionId: generateUID(currentUser.uid, userData.userRecordsId),
    userId: currentUser.uid,
    organization: userData.organization,
    name: userData.name,
    country : userData.country,
    speciality: userData.speciality,
    question: question,
    firstAnswer: firstAnswer,
    secondAnswer: secondAnswer,
    evaluation: evaluation,
    secondEvaluation: secondEvaluation,
    vote: vote,
    tags: tags,
    idealAnswer: idealAnswer,
    likertCount: likertCount,
    secondLikertCount: secondLikertCount,
    numberOfTags: numberOfTags,
    scoreIncrement: scoreIncrease,
    createdAt: serverTimestamp(),
    
  }).then(() => { 
    const newQuery = query(
      collection(db, "users"),
      where("userId", "==", currentUser.uid)
    ); 
    const userRecordRef = doc(db,'users',userRecordsId);

    getDocs(newQuery).then((querySnapshot) => {
      querySnapshot.forEach(async (user) => {
   

    await updateDoc( userRecordRef, { score: actualScore + scoreIncrease });
    })})
    
    setMessages(["Contribution stored !"]);
    return setError(false);
  })
  .catch((e) => {
    console.log(e)
    setMessages(["Failed to index contribution in database "]);
    return setError(true);
  });
}

export async function getNumberEvaluationsForUser(currentUser){
  const q = query(
    collection(db, "contributions"),
    where("userId", "==", currentUser.uid)
  );
  let evaluationSum = 0;
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const contributionData = doc.data();
    evaluationSum += contributionData.likertCount;
  });

  return evaluationSum
 
}

export async function getNRecentContributions(n){
  const q = query(
    collection(db, "contributions"),
    orderBy('createdAt','desc'),
    limit(n)
  );
  const querySnapshot = await getDocs(q);
  let contributions = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    contributions.push({
      question: docData.question,
      createdAt: docData.createdAt.toDate().toString(),
      contributionId: docData.contributionId,
      userName: docData.name,
      country: docData.country,
    });
  });
  return contributions;


}

export async function getContributionsFromOrg(org) {
  const q = query(
    collection(db, "contributions"),
    where("organization", "==", org)
  );
  const querySnapshot = await getDocs(q);
  let contributions = [];

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    contributions.push({
      userName: docData.name,
      question: docData.question,
      createdAt: docData.createdAt.toDate(),
      country: docData.country,
      contributionId: docData.contributionId,
    });
  });

  // Group by user name
  const groupedByUser = contributions.reduce((acc, contribution) => {
    const { userName } = contribution;
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(contribution);
    return acc;
  }, {});

  // Sort each user's contributions by createdAt desc
  for (let user in groupedByUser) {
    groupedByUser[user].sort((a, b) => b.createdAt - a.createdAt);
  }

  // Flatten the grouped and sorted contributions
  const sortedContributions = Object.keys(groupedByUser)
    .sort()
    .flatMap(user => groupedByUser[user]);

  return sortedContributions.map(contribution => ({
    userName: contribution.userName,
    question: contribution.question,
    createdAt: contribution.createdAt.toString(),
    country: contribution.country,
    contributionId: contribution.contributionId,
  }));
}


export async function getYourNumberOfAnswers(currentUser){
  const q = query(
    collection(db, "contributions"),
    where("userId", "==", currentUser.uid)
  );
  let answersCount = 0;

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const contributionData = doc.data();
    if (contributionData.idealAnswer !== "") answersCount++;
  });
  return answersCount;

}

export async function getContributionAnswers(contributionId) {
  const q = query(
    collection(db, "contributions"),
    where("contributionId", "==", contributionId)
  );
  const querySnapshot = await getDocs(q);
  let answers = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    answers.push(docData.firstAnswer, docData.secondAnswer);
  });
  return answers;
}

export async function getYourNContributions(currentUser,n){

  const q = query(
    collection(db, "contributions"),
    where("userId", "==", currentUser.uid),
    orderBy('createdAt','desc'),
    limit(n)
  );
  const querySnapshot = await getDocs(q);
  let contributions = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    contributions.push({
      question: docData.question,
      userName: docData.name,
      createdAt: docData.createdAt.toDate().toString(),
      contributionId: docData.contributionId,
    });
  });
  return contributions;



}


export async function getNumberOfUsersOfOrg(org){
  const q = query(
    collection(db, "users"),
    where("organization", "==", org)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length !== 0) {
    return querySnapshot.docs.length;
  } else {
    return 0;
  }
}

export async function getNumberContributionsForUser(currentUser){
  const q = query(
    collection(db, "contributions"),
    where("userId", "==", currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length !== 0) {
    return querySnapshot.docs.length;
  } else {
    return 0;
  }
}


export async function getOrganizationScore(org){
  const q = query(
    collection(db, "users"),
    where("organization", "==", org), 

  );
  let scoreSum = 0;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const userData = doc.data();
    scoreSum += userData.score;
  });




  if (querySnapshot.docs.length !== 0) {
    return scoreSum;
  } else {
    return 0;
  }
}



export async function getNearestTopPercentile(user_id) {
  const allUsersQuery = query(collection(db, "users"), orderBy('score', 'desc'));
  const querySnapshot = await getDocs(allUsersQuery);

  let users = [];
  querySnapshot.forEach(doc => {
    users.push({ id: doc.data().userId, score: doc.data().score });
  });

  const userIndex = users.findIndex(u => u.id === user_id);
  if (userIndex === -1) return null;  // User not found

  const percentileRank = ((userIndex / (users.length - 1)) * 100).toFixed(2);

  const roundedPercentile = roundToNearest5Or10(percentileRank);

  return roundedPercentile;
}

function roundToNearest5Or10(percentile) {
  if (percentile < 5) {
    const rounded = Math.round(percentile);
    return rounded === 0 ? 1 : rounded; // Ensure we never return 0
  }

  const base = Math.floor(percentile / 10) * 10;
  const difference = percentile - base;
  if (difference === 0) return base;
  return (difference <= 5) ? base + 5 : base + 10;
}

export async function getTop3DoctorsFromOrg(org){
  const q = query(
    collection(db, "users"),
    where("organization", "==", org),
    orderBy('score','desc'),
    limit(3)
  );
  const querySnapshot = await getDocs(q);
  let top_users_names = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    top_users_names.push({
      name: docData.name,   // Access the 'name' field
      score: docData.score  // Access the 'score' field
    });
  });
  return top_users_names;
}


export async function uploadFile(
  file,
  currentUser,
  setProgresspercent,
  setError,
  setMessages,
  userRecordsId,
  actualScore,
  setUserData
  ,userData
) {
  const size = formatBytes(file.size);
  document.getElementById("fileInput").value = "";
  console.log("Logging file : ")
  console.log(file)

  if (file == null) return;
  if (file.size > 2.5e+7) {
    setMessages(["File size exceeds 25MB, please upload a smaller file."]);
    return setError(true);
  }
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (fileExtension === "pdf") {
  const q = query(
    collection(db, "files"),
    where("name", "==", file.name),
    where("userId", "==", currentUser.uid)
  );
  const docSnap = await getDocs(q);
  if (docSnap.docs.length > 0) {
    setMessages(["File has already been uploaded !"]);
    return setError(true);
  }

  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const numPages = pdfDoc.getPageCount(); // Get the number of pages

  const finalPath = `/files/${currentUser.uid}/${file.name}`;
  const storageRef = ref(storage, finalPath);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgresspercent(progress);
    },
    (error) => {
      setMessages(["File not uploaded!"]);
      return setError(true);
    },
    () => {
      const newQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      getDownloadURL(uploadTask.snapshot.ref)
        .then(async (downloadURL) => {
          const userRecordRef = doc(db,'users',userRecordsId);

          getDocs(newQuery).then((querySnapshot) => {
            querySnapshot.forEach(async (user) => {
              await updateDoc( userRecordRef, {
                score: actualScore + numPages,
              });
            });
          });
          const docRef = addDoc(collection(db, "files"), {
            url: downloadURL,
            name: file.name,
            pages: numPages,
            userId: currentUser.uid,
            size: size,
            createdAt: Date().toString(),
            filePath: finalPath,
          });
        })
        .then(() => {
          setUserData({...userData, score: actualScore+numPages})
          setMessages(["File uploaded !"]);
          return setError(false);
        })
        .catch((e) => {
          console.log(e)
          setMessages(["Failed to index file in database "]);
          return setError(true);
        });
    }
  );
  } else if (fileExtension === "docx") {
    const q = query(
      collection(db, "files"),
      where("name", "==", file.name),
      where("userId", "==", currentUser.uid)
    );
    const docSnap = await getDocs(q);
    if (docSnap.docs.length > 0) {
      setMessages(["File has already been uploaded !"]);
      return setError(true);
    }

    const pageCountDocx = await getPageCountFromDocx(file);
    console.log("Extracted Page Count:", pageCountDocx);


    const finalPath = `/files/${currentUser.uid}/${file.name}`;
    const storageRef = ref(storage, finalPath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        setMessages(["File not uploaded!"]);
        return setError(true);
      },
      () => {
        const newQuery = query(
          collection(db, "users"),
          where("userId", "==", currentUser.uid)
        );
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            const userRecordRef = doc(db,'users',userRecordsId);
  
            getDocs(newQuery).then((querySnapshot) => {
              querySnapshot.forEach(async (user) => {
                await updateDoc( userRecordRef, {
                  score: actualScore + pageCountDocx,
                });
              });
            });
            const docRef = addDoc(collection(db, "files"), {
              url: downloadURL,
              name: file.name,
              pages: pageCountDocx,
              userId: currentUser.uid,
              size: size,
              createdAt: Date().toString(),
              filePath: finalPath,
            });
          })
          .then(() => {
            setUserData({...userData, score: actualScore+pageCountDocx})
            setMessages(["File uploaded !"]);
            return setError(false);
          })
          .catch((e) => {
            console.log(e)
            setMessages(["Failed to index file in database "]);
            return setError(true);
          });
      }
    );


  }
  else {
    setMessages(["Filename not valid : does it end with .pdf or .docx ?"]);
    return setError(true);
  }

}

export function downloadFile(file) {
  axios
    .get(file.url, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, file.name);
    });
}

const dbOperations = {
  uploadFile,
  downloadFile,
  getFiles,
};
export default dbOperations;