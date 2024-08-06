import React, { memo } from 'react';
// import type { FC } from 'react';

import resets from './_resets.module.css';
import classes from './MOOVELandingPage.module.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Vector200Icon } from './Vector200Icon';
import { Vector200Icon2 } from './Vector200Icon2';
import { Vector200Icon3 } from './Vector200Icon3';
import { Vector200Icon4 } from './Vector200Icon4';
import { Vector200Icon5 } from './Vector200Icon5';
import { Vector200Icon6 } from './Vector200Icon6';
import LoginModal from '@/app/login/loginModal';
import ModifyStudent from '@/components/students/ModifyStudent';

// interface Props {
//   className?: string;
// }
/* @figmaId 161:533 */
function MOOVELandingPage(props = {}) {

  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>

      <div className={`${resets.clapyResets} ${classes.root}`}>
        <div className={classes.topBar}>
          <div className={classes.rectangle4137}></div>
          <div className={classes.title}>MOOVE </div>
          <div className={classes.navigation}>
            <div className={classes.tab}>Home</div>
            <div className={classes.tab2}>How It Works</div>
            <div className={classes.tab3}>Sign Up</div>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.container}>
            <div className={classes.title2}>Welcome to MOOVE: Massive Open Online Validation &amp; Evaluation</div>
            <div className={classes.description}>An innovative platform for collaborative learning</div>
            {/* <Button colorScheme='blue'>Blue</Button> */}
            <div onClick={onSignInOpen} className={classes.button}>
              <div className={classes.primary}>
                <div className={classes.title3}>Sign In</div>

                {/* <div className={classes.title3}>Sign Up Now</div> */}
              </div>
            </div>
            <div onClick={onSignUpOpen} className={classes.button}>
              <div className={classes.primary}>
                <div className={classes.title3}>Sign Up</div>

                {/* <div className={classes.title3}>Sign Up Now</div> */}
              </div>
            </div>
          </div>
          <div className={classes.imageContainer}>
            <div className={classes.image}></div>
          </div>
          <div className={classes.vector200}>
            <Vector200Icon className={classes.icon} />
          </div>
        </div>
        <div className={classes.products}>
          <div className={classes.container2}>
            <div className={classes.title4}>Key Features</div>
          </div>
          <div className={classes.list}>
            <div className={classes.row}>
              <div className={classes.card}>
                <div className={classes.imageContainer2}>
                  <div className={classes.image2}>
                    <div className={classes.title5}>icon1</div>
                  </div>
                </div>
                <div className={classes.textContent}>
                  <div className={classes.title6}>Interactive Sessions</div>
                  <div className={classes.subtitle}>Engage with peers in real-time</div>
                </div>
              </div>
              <div className={classes.card2}>
                <div className={classes.imageContainer3}>
                  <div className={classes.image3}>
                    <div className={classes.title7}>icon2</div>
                  </div>
                </div>
                <div className={classes.textContent2}>
                  <div className={classes.title8}>Personalized Learning Paths</div>
                  <div className={classes.subtitle2}>learning experiences</div>
                </div>
              </div>
              <div className={classes.card3}>
                <div className={classes.imageContainer4}>
                  <div className={classes.image4}>
                    <div className={classes.title9}>icon3</div>
                  </div>
                </div>
                <div className={classes.textContent3}>
                  <div className={classes.title10}>Performance Analytics</div>
                  <div className={classes.subtitle3}>Track your progress</div>
                </div>
              </div>
            </div>
            <div className={classes.row2}>
              <div className={classes.card4}>
                <div className={classes.imageContainer5}>
                  <div className={classes.image5}>
                    <div className={classes.title11}>icon4</div>
                  </div>
                </div>
                <div className={classes.textContent4}>
                  <div className={classes.title12}>Collaborative Projects</div>
                  <div className={classes.subtitle4}>Work together on projects</div>
                </div>
              </div>
              <div className={classes.card5}>
                <div className={classes.imageContainer6}>
                  <div className={classes.image6}>
                    <div className={classes.title13}>icon5</div>
                  </div>
                </div>
                <div className={classes.textContent5}>
                  <div className={classes.title14}>Peer Feedback</div>
                  <div className={classes.subtitle5}>Receive feedback from peers</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.vector2002}>
            <Vector200Icon2 className={classes.icon2} />
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container3}>
            <div className={classes.title15}>What is MOOVE?</div>
            <div className={classes.description2}>
              A collaborative platform where doctors can share their expertise to align AI with real-world medical
              standards.
            </div>
          </div>
          <div className={classes.list2}>
            <div className={classes.row3}>
              <div className={classes.article}>
                <div className={classes.imageContainer7}>
                  <div className={classes.image7}></div>
                </div>
                <div className={classes.frame427318906}>
                  <div className={classes.title16}>Interactive Learning</div>
                  <div className={classes.subtitle6}>Engage in live discussions and group activities.</div>
                </div>
              </div>
              <div className={classes.article2}>
                <div className={classes.imageContainer8}>
                  <div className={classes.image8}></div>
                </div>
                <div className={classes.frame4273189062}>
                  <div className={classes.title17}>Personalized Paths</div>
                  <div className={classes.subtitle7}>Create learning paths based on your goals and interests.</div>
                </div>
              </div>
            </div>
            <div className={classes.row4}>
              <div className={classes.article3}>
                <div className={classes.imageContainer9}>
                  <div className={classes.image9}></div>
                </div>
                <div className={classes.frame4273189063}>
                  <div className={classes.title18}>Performance Tracking</div>
                  <div className={classes.subtitle8}>Monitor your progress and identify areas for improvement.</div>
                </div>
              </div>
              <div className={classes.article4}>
                <div className={classes.imageContainer10}>
                  <div className={classes.image10}></div>
                </div>
                <div className={classes.frame4273189064}>
                  <div className={classes.title19}>Projects Collaboration</div>
                  <div className={classes.subtitle9}>Collaborate with others on hands-on projects.</div>
                </div>
              </div>
            </div>
            <div className={classes.row5}>
              <div className={classes.article5}>
                <div className={classes.imageContainer11}>
                  <div className={classes.image11}></div>
                </div>
                <div className={classes.frame4273189065}>
                  <div className={classes.title20}>Peer Feedback</div>
                  <div className={classes.subtitle10}>Receive valuable feedback from peers to grow your skills.</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.vector2003}>
            <Vector200Icon3 className={classes.icon3} />
          </div>
        </div>
        <div className={classes.list3}>
          <div className={classes.container4}>
            <div className={classes.title21}>Benefits of MOOVE</div>
          </div>
          <div className={classes.list4}>
            <div className={classes.row6}>
              <div className={classes.item}>
                <div className={classes.frame}>
                  <div className={classes.icon4}>
                    <p className={classes.labelWrapper}>icon1</p>
                  </div>
                </div>
                <div className={classes.frame4273189066}>
                  <div className={classes.title22}>Flexible Learning</div>
                  <div className={classes.subtitle11}>Learn at your own pace</div>
                </div>
              </div>
              <div className={classes.item2}>
                <div className={classes.frame2}>
                  <div className={classes.icon5}>
                    <p className={classes.labelWrapper2}>icon2</p>
                  </div>
                </div>
                <div className={classes.frame4273189067}>
                  <div className={classes.title23}>Community Engagement</div>
                  <div className={classes.subtitle12}>Interact with a diverse community</div>
                </div>
              </div>
            </div>
            <div className={classes.row7}>
              <div className={classes.item3}>
                <div className={classes.frame3}>
                  <div className={classes.icon6}>
                    <p className={classes.labelWrapper3}>icon3</p>
                  </div>
                </div>
                <div className={classes.frame4273189068}>
                  <div className={classes.title24}>Skill Development</div>
                  <div className={classes.subtitle13}>Enhance your skills through practical tasks</div>
                </div>
              </div>
              <div className={classes.item4}>
                <div className={classes.frame4}>
                  <div className={classes.icon7}>
                    <p className={classes.labelWrapper4}>icon4</p>
                  </div>
                </div>
                <div className={classes.frame4273189069}>
                  <div className={classes.title25}>Global Connections</div>
                  <div className={classes.subtitle14}>Connect with learners worldwide</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.vector2004}>
            <Vector200Icon4 className={classes.icon8} />
          </div>
        </div>
        <div className={classes.section2}>
          <div className={classes.avatar}></div>
          <div className={classes.container5}>
            <div className={classes.title26}>Who Should Use MOOVE?</div>
            <div className={classes.description3}>MOOVE is suitable for .......</div>
          </div>
          <div className={classes.vector2005}>
            <Vector200Icon5 className={classes.icon9} />
          </div>
        </div>
        <div className={classes.form}>
          <div className={classes.container6}>
            <div className={classes.title27}>Join us in reshaping the future of online learning</div>
          </div>
          <div className={classes.list5}>
            <div className={classes.row8}>
              <div className={classes.input}>
                <div className={classes.title28}>Email Address</div>
                <div className={classes.textfield}>
                  <div className={classes.text}>
                    <p className={classes.labelWrapper5}>Enter your email</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.row9}>
              <div className={classes.input2}>
                <div className={classes.title29}>Password</div>
                <div className={classes.textfield2}>
                  <div className={classes.text2}>
                    <p className={classes.labelWrapper6}>Enter your password</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.button2}>
              <div className={classes.primary2}>
                <div className={classes.title30}>Sign Up</div>
              </div>
            </div>
          </div>
          <div className={classes.vector2006}>
            <Vector200Icon6 className={classes.icon10} />
          </div>
        </div>
        <div className={classes.section3}>
          <div className={classes.container7}>
            <div className={classes.title31}>Privacy Policy</div>
            <div className={classes.title32}>Terms of Service</div>
            <div className={classes.title33}>Contact Us</div>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isSignInOpen}
        onClose={onSignInClose}
        initialRef={initialRef}
        finalRef={finalRef}
        title="Login"
      />
      <ModifyStudent
        isOpen={isSignUpOpen}
        onClose={onSignUpClose}
        initialRef={initialRef}
        finalRef={finalRef}
        title="Sign Up"
        isNewUser = {true}
      />
    </>
  );
};

export default MOOVELandingPage;
