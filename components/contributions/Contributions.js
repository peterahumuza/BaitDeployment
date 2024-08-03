import { HStack, VStack, Text, SimpleGrid, Textarea, Box  } from '@chakra-ui/react';
import React, { useState, useEffect, useCallback } from 'react';
import useAuth from "@/context/AuthContext";
import { storeContributionInDatabase } from "@/helpers/dbOperations";
import useError from "@/context/ErrorContext";
import PromptBubble from "@/components/contributions/PromptBubble";
import PromptSuggestion from "@/components/contributions/PromptSuggestion";
import Answers from "@/components/contributions/Answers";
import Question from "@/components/contributions/Question";
import { LikertCriteria } from "@/components/contributions/Likert";
import APICall from "@/components/chat/APICall";
import ScoringSystem from "@/components/contributions/ScoringSystem";
import { NewQuestionButton } from "@/components/contributions/Buttons";
import { Likert } from "@/components/contributions/Likert";
import LessBiasedSelection from "@/components/contributions/LessBiasedSelection";
import InfoButton from "@/components/contributions/InfoButton";
import ResizeTextarea from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { MarkdownComponents } from "@/components/contributions/Markdown";
import { debounce } from 'lodash';

// HELPER FUNCTIONS

function likertToString(arr) {
  let result = '';
  const numCriteria = LikertCriteria.length;

  for (let i = 0; i < numCriteria; i++) {
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] >= 1 && arr[i] <= 5) {
        result += arr[i];
      } else {
        result += '0';
      }
    } else {
      result += '0';
    }
  }

  return result;
}

function optionalLikertToString(arr,equalVote) {
  if(equalVote === "12"){
    return likertToString(arr);
  } else {
  let result = '';
  const numCriteria = LikertCriteria.length;

  for (let i = 0; i < numCriteria; i++) {
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] >= 1 && arr[i] <= 5) {
        result += arr[i];
      } else {
        result += 'X';
      }
    } else {
      result += 'X';
    }
  }

  return result;
}
}

function countNonValuedChars(str,char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== char) {
      count++;
    }
  }
  return count;
}

function countNonZeroChars(str) {
  return countNonValuedChars(str,'0');
}

function createOneHotEncoding(selectedTags) {
  const tagOptions = [
      { label: "Algorithimic bias", value: "algorithimic bias", colorScheme: "red" },
      { label: "Evaluation bias", value: "evaluation bias", colorScheme: "red" },
      { label: "Confirmation bias", value: "comfirmation bias", colorScheme: "red" },
      { label: "Confounding bias", value: "confounding bias", colorScheme: "red" },
      { label: "Stereotyping bias", value: "stereotyping bias", colorScheme: "red" },
    
  ];

  let encoding = '0'.repeat(tagOptions.length).split('');

  for (let i = 0; i < tagOptions.length; i++) {
    if (selectedTags.some(tag => tag.value === tagOptions[i].value)) {
      encoding[i] = '1';
    }
  }

  return encoding.join('');
}

export default function Contributions({ upgradeScore, contribution = {} }) {
  const { currentUser, userData, userRecordsId, setUserData } = useAuth();
  const [likert, setLikert] = useState([]);
  const [likert1, setLikert1] = useState([]);
  const [messages, setMessages] = useState([]);
  const { error, setError } = useError();
  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [improvedAnswer, setImprovedAnswer] = useState('');
  const [vote, setVote] = useState("none");
  const [equalVote, setEqualVote] = useState("none");
  const [badTags, setBadTags] = useState([]);
  const [stage, setStage] = useState(0);
  const [pointsGained, setPointsGained] = useState(0);
  const [tagAwarded, setTagAwarded] = useState(false);
  const [likertAwarded, setLikertAwarded] = useState(false);
  const [likertAwarded1, setLikertAwarded1] = useState(false);
  const [voteShown, setVoteShown] = useState(false);
  const [answerAwarded, setAnswerAwarded] = useState(false);

  useEffect(() => {
    if (contribution.question && contribution.answers) {
      setQuestion(contribution.question);
      setAnswer1(contribution.answers[0]);
      setAnswer2(contribution.answers[1]);
      setStage(1);
    }
  }, [contribution]);
  

  async function fetchAnswers(question) {
    const newQuestion = { role: 'user', content: question };
    const answer1 = await APICall([newQuestion]);
    setAnswer1(answer1);
    const newAnswer1 = { role: 'assistant', content: answer1 };
    const updatedMessages = [newQuestion, newAnswer1];
    setMessages(updatedMessages);

    const answer2 = await APICall([newQuestion]);
    setAnswer2(answer2);
    const newAnswer2 = { role: 'assistant', content: answer2 };
    updatedMessages.push(newAnswer2);
    setMessages(updatedMessages);
    setVoteShown(true);
  };

  function updateLikert(criteria) {
    setLikert(criteria);
    const numSelected = criteria.filter((score) => score !== null).length;
    
    if (numSelected === LikertCriteria.length && !likertAwarded) {

      setPointsGained(pointsGained + ScoringSystem.pointsPerEval);
      setLikertAwarded(true);
    }
  }

  function updateLikert1(criteria) {
    setLikert1(criteria);
    const numSelected = criteria.filter((score) => score !== null).length;
    
    if (numSelected === LikertCriteria.length && !likertAwarded1) {

      setPointsGained(pointsGained + ScoringSystem.pointsPerEval);
      setLikertAwarded1(true);
    }
  }

  function onSubmitQuestion(question) {
    setQuestion(question);
    if (question !== '') {
      setPointsGained(ScoringSystem.pointsPerQuestion);
    }
    nextStage();
    fetchAnswers(question);
  }

  function Justification({ vote, handleBadTag, badTags, likert, updateLikert, improvedAnswer, onSubmit, equalVote, likert1,updateLikert1 }) {
    
    return (
      <>
        {vote === "1" ? (
          <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
            <Likert likert={likert} updateLikert={updateLikert} />
            <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
              <LessBiasedSelection handleChange={handleBadTag} tags={badTags} />
              {/* <ImprovedAnswer
                improvedAnswer={improvedAnswer}
                onSubmit={onSubmit}
              /> */}
              
            </VStack>
            <Box gridColumn="1 / -1" display="flex" justifyContent="center">
              <ImprovedAnswer
                improvedAnswer={improvedAnswer}
                onSubmit={onSubmit}
              />
            </Box>
          </SimpleGrid>
        ) : equalVote =="12" ? (

          <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
            <Likert likert={likert} updateLikert={updateLikert} header="Evaluate answer 1" />
            <Likert likert={likert1} updateLikert={updateLikert1} header="Evaluate answer 2" />
            
            <Box gridColumn="1 / -1" display="flex" justifyContent="center">
              <ImprovedAnswer
                improvedAnswer={improvedAnswer}
                onSubmit={onSubmit}
              />
            </Box>
          </SimpleGrid>
        ): (
          <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
            <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
              <LessBiasedSelection handleChange={handleBadTag} tags={badTags} />
              {/* <ImprovedAnswer
                improvedAnswer={improvedAnswer}
                onSubmit={onSubmit}
              /> */}
            </VStack>
            <Likert likert={likert} updateLikert={updateLikert} />
            <Box gridColumn="1 / -1" display="flex" justifyContent="center">
              <ImprovedAnswer
                improvedAnswer={improvedAnswer}
                onSubmit={onSubmit}
              />
            </Box>
          </SimpleGrid>
        )}
      </>
    );
  }

  function ImprovedAnswer({ onSubmit, improvedAnswer }) {
    const [improvedAnswerText, setImprovedAnswerText] = useState(improvedAnswer);
  
    const debouncedSubmit = useCallback(
      debounce((text) => onSubmit(text), 2000),
      []
    );
  
    const handleChange = (e) => {
      const text = e.target.value;
      setImprovedAnswerText(text);
      debouncedSubmit(text);
    };
  
    useEffect(() => {
      setImprovedAnswerText(improvedAnswer);
    }, [improvedAnswer]);
  
    return (
      <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start" className="bg-box dark:bg-gray-700 color-white dark:color-dark" p="5" rounded="2vw" shadow="md">
        <HStack w="100%" justifyContent="space-between" alignItems="flex-start" spacing="1vw">
          <Text fontWeight="400">Write your ideal answer</Text>
          <InfoButton
            title="Improved answer"
            description="Write an improved version of the answer that you believe would be more helpful to the user. You can copy and paste the better answer and edit it to improve it. You can also write a completely new answer."
          />
        </HStack>
        <Textarea
          value={improvedAnswerText}
          h="fit-content"
          as={ResizeTextarea}
          onChange={handleChange}
          placeholder="Type your answer here..."
          minRows={3}
          maxRows={20}
          style={{ resize: 'none', height: 'auto' }}
        />
      </VStack>
    );
  }


  function nextStage() {
    setStage(stage + 1);
  }

  function handleVote1() {
    setVote("1");
    setPointsGained(ScoringSystem.pointsPerVote + ScoringSystem.pointsPerQuestion);
    nextStage();
    setBadTags([]);
    setLikert([]);
  }
  function handleVote2() {
    setVote("2");
    setPointsGained(ScoringSystem.pointsPerVote + ScoringSystem.pointsPerQuestion);
    nextStage();
    setBadTags([]);
    setLikert([]);
  }

  function handleEqualVote(){
    setEqualVote("12")

    nextStage();
    setLikert([]);
    setLikert1([]);
  }

  function handleBadTag(ev) {
    setBadTags(ev);
    if (ev.length > 0 && !tagAwarded) {
      setPointsGained(pointsGained + ScoringSystem.pointsPerTag);
      setTagAwarded(true);
    }

    if(ev.length === 0 && tagAwarded) {

      setPointsGained(pointsGained - ScoringSystem.pointsPerTag);
      setTagAwarded(false);
    }



    nextStage();
  }

function handleImprovedAnswer(improvedAnswer, points = pointsGained) {
  setImprovedAnswer(improvedAnswer);  // Update the improvedAnswer state
  
  if (improvedAnswer.length > 0 && !answerAwarded) {
    setPointsGained(points + ScoringSystem.pointsPerAnswer);
    setAnswerAwarded(true);
  }
  
  if(improvedAnswer.length === 0 && answerAwarded) {

    setPointsGained(points - ScoringSystem.pointsPerAnswer);
    setAnswerAwarded(false);
  }


  nextStage();
}

function handleEqualVoteBackButton()
{
  let newPointsGained = pointsGained;

  if(likertAwarded == true){
    
    newPointsGained -= ScoringSystem.pointsPerEval;
    setPointsGained(newPointsGained);
    
    setLikertAwarded(false);
  }

  if(likertAwarded1 == true){
    newPointsGained -= ScoringSystem.pointsPerEval;
    setPointsGained(newPointsGained);
    
    setLikertAwarded1(false);
  }

  setLikert([]);
  setLikert1([]);

  setImprovedAnswer("");
  handleImprovedAnswer("",newPointsGained)
  
  setVote("none");
  setEqualVote("none");
  setStage(1);
}

  function reset() {
    setQuestion('');
    setAnswer1('');
    setAnswer2('');
    setImprovedAnswer('');
    setLikert([]);
    setLikert1([]);
    setVote("none");
    setEqualVote("none");
    setBadTags([]);
    setStage(0);
    setPointsGained(0);
    setTagAwarded(false);
  }

  function handleNewQuestion() {
    const encodedTags = createOneHotEncoding(badTags);
    const numberOfTags = countNonZeroChars(encodedTags);
    const likertString = likertToString(likert);
    const likertCount = countNonZeroChars(likertString);
    const likertString1 = optionalLikertToString(likert1,equalVote);
    const likertCount1 = countNonValuedChars(likertString1,'X');

    let scoreIncrease = pointsGained;
  
    // Update the database : an equal vote for two options 1 and 2 are encoded as "12"
    if(equalVote !== '12'){
    storeContributionInDatabase(
      currentUser, userData, question, answer1, answer2, likertString, vote,
      encodedTags, improvedAnswer,likertString1,likertCount1, scoreIncrease, userRecordsId, likertCount,
      numberOfTags, setUserData, setMessages, setError);
    } else {
      storeContributionInDatabase(
        currentUser, userData, question, answer1, answer2, likertString, equalVote,
        encodedTags, improvedAnswer,likertString1,likertCount1, scoreIncrease, userRecordsId, likertCount,
        numberOfTags, setUserData, setMessages, setError);
    }
    upgradeScore(pointsGained);
    reset();
  }

  return (
    <VStack w="100%" h="100%" spacing="4" justifyContent="flex-start" alignItems="center" pl="5%" pr="5%" overflowY="auto" pb="5vh">
      {stage === 0 &&
        <>
          <PromptSuggestion />
          <PromptBubble onSubmit={(question) => { onSubmitQuestion(question) }} placeholder="Enter a question" />
        </>
      }
      {stage >= 1 &&
        <Question question={question} />
      }
      {stage >= 1 &&
        <Answers answer1={answer1} answer2={answer2} vote={vote} handleVote1={handleVote1} handleVote2={handleVote2} voteShown={voteShown} equalVote={equalVote} handleEqualVote={handleEqualVote} handleEqualVoteBackButton ={handleEqualVoteBackButton} />
      }
      {stage >= 2 &&
        <Justification
          vote={vote}
          handleBadTag={handleBadTag}
          badTags={badTags}
          likert={likert}
          updateLikert={updateLikert}
          improvedAnswer={improvedAnswer}
          onSubmit={handleImprovedAnswer}
          equalVote = {equalVote}
          likert1 = {likert1}
          updateLikert1 = {updateLikert1}
        />
      }
      {stage >= 2 &&
        <NewQuestionButton onClick={handleNewQuestion} pointsGained={pointsGained} />
      }
    </VStack>
  );
}