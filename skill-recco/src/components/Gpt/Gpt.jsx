// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// function Gpt() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   useEffect(() => {
//     setQuestion(transcript);
//   }, [transcript]);

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const apiKey = "sk-proj-";
//   const apiUrl = "https://api.openai.com/v1/chat/completions";

//   const formatResponse = (response) => {
//     let formattedResponse = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
//     const boldBeforeColonRegex = /([^:]*):\s([^<]*)/g;
//     formattedResponse = formattedResponse.replace(boldBeforeColonRegex, '<strong>$1</strong>: $2');
//     const heading1Regex = /^#\s(.*)$/gm;
//     const heading2Regex = /^##\s(.*)$/gm;
//     const heading3Regex = /^###\s(.*)$/gm;
//     formattedResponse = formattedResponse.replace(heading1Regex, '<h1><strong>$1</strong></h1>');
//     formattedResponse = formattedResponse.replace(heading2Regex, '<h2><strong>$1</strong></h2>');
//     formattedResponse = formattedResponse.replace(heading3Regex, '<h3><strong>$1</strong></h3>');
//     return formattedResponse;
//   };

//   const GptPosting = async (currentQuestion) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         apiUrl,
//         {
//           model: 'gpt-3.5-turbo-0125',
//           messages: [{ role: 'user', content: currentQuestion }],
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const rawAnswer = response.data.choices[0].message.content;
//       const formattedAnswer = formatResponse(rawAnswer);
//       setAnswer(formattedAnswer);
//       setHistory((prevHistory) => [...prevHistory, { question: currentQuestion, answer: formattedAnswer }]);
//     } catch (error) {
//       console.error('Error asking question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (question.trim()) {
//       await GptPosting(question);
//       setQuestion('');
//     }
//   };

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//     }, 10000); // Stop listening after 10 seconds
//   };

//   const handleButtonClick = async (buttonQuestion) => {
//     await GptPosting(buttonQuestion);
//   };

//   const handleNewChat = () => {
//     setHistory([]);
//     setAnswer('');
//     setQuestion('');
//     resetTranscript();
//   };

//   return (
//     <div className='flex'>
//       <div className='h-screen p-3 border-2 border-gray hidden md:block'>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5' onClick={handleNewChat}>
//           <img className="mr-4" src='plus.pn' alt='new' />New Chat
//         </button>
//         <button className='ml-5 p-3 flex bg-pink-300 gap-4 font-bold rounded-lg w-64 mt-5'>
//           <img src='file.png' alt='file' />File
//         </button>
//       </div>
//       <div className='border-1 w-1/2 mx-auto p-10 h-screen'>
//         <div className='overflow-y-scroll h-[750px]'>
//           <img className="w-12 h-12 mx-auto" src='giga.jpeg' alt='img' />
//           <div className='flex text-center w-72 mx-auto'>
//             <h1 className='font-bold mb-5'>✨✨ Skill Recco,</h1>
//             <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>Resume Synthesizer</a>
//           </div>
//           <div className='flex p-2 gap-4 '>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is RAG in computer science?')}>What is RAG in ML?</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is the best career path recommendations?')}>What is the best career path recommendations?</button>
//           </div>
//           <div className='flex p-2 gap-4'>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('Good career path for non-technical student')}>Good career path for non-technical student</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('How can I make my career better?')}>How can I make my career better?</button>
//           </div>
          
//           {loading && (
//             <div className="thinking-message">
//               <strong>Skill Recco Thinking...</strong>
//             </div>
//           )}
          
//           {history.length > 0 && (
//             <div className="history">
//               {history.map((item, index) => (
//                 <div key={index} className="history-item">
//                   <div className='flex' style={{ lineHeight: "40px" }}>
//                     <div className='w-12 h-12 rounded-full text-center' style={{ lineHeight: "38px" }}><img src="user.png" alt='' /></div>
//                     <div className='ml-3'>{item.question}</div>
//                   </div>
//                   <div className='flex'>
//                     <strong className='text-blue-300'>Ans:</strong>
//                     <div className='ml-3' dangerouslySetInnerHTML={{ __html: item.answer }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <form className='flex' onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className='w-11/12 border-2 p-1 pl-3 border-none rounded-lg'
//             value={question}
//             style={{borderBottom:"0.5px solid grey",borderLeft:""}}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter your question..."
//             required
//           />
//           <button className='hover:bg-blue-300 p-2 rounded-lg ml-2' style={{lineHeight:"20px"}} type="button" onClick={handleStartListening}>
//             <img className='mt-3' src='mic.svg' alt='' />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Gpt;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// function Gpt() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   useEffect(() => {
//     setQuestion(transcript);
//   }, [transcript]);

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const apiKey = "sk-proj-";
//   const apiUrl = "https://api.openai.com/v1/chat/completions";

//   const formatResponse = (response) => {
//     let formattedResponse = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
//     const boldBeforeColonRegex = /([^:]*):\s([^<]*)/g;
//     formattedResponse = formattedResponse.replace(boldBeforeColonRegex, '<strong>$1</strong>: $2');
//     const heading1Regex = /^#\s(.*)$/gm;
//     const heading2Regex = /^##\s(.*)$/gm;
//     const heading3Regex = /^###\s(.*)$/gm;
//     formattedResponse = formattedResponse.replace(heading1Regex, '<h1><strong>$1</strong></h1>');
//     formattedResponse = formattedResponse.replace(heading2Regex, '<h2><strong>$1</strong></h2>');
//     formattedResponse = formattedResponse.replace(heading3Regex, '<h3><strong>$1</strong></h3>');
//     return formattedResponse;
//   };

//   const GptPosting = async (currentQuestion) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         apiUrl,
//         {
//           model: 'gpt-3.5-turbo-0125',
//           messages: [{ role: 'user', content: currentQuestion }],
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const rawAnswer = response.data.choices[0].message.content;
//       const formattedAnswer = formatResponse(rawAnswer);
//       setAnswer(formattedAnswer);
//       setHistory((prevHistory) => [...prevHistory, { question: currentQuestion, answer: formattedAnswer }]);
//     } catch (error) {
//       console.error('Error asking question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (question.trim()) {
//       await GptPosting(question);
//       setQuestion('');
//     }
//   };

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//     }, 10000); // Stop listening after 10 seconds
//   };

//   const handleButtonClick = async (buttonQuestion) => {
//     await GptPosting(buttonQuestion);
//   };

//   const handleNewChat = () => {
//     setHistory([]);
//     setAnswer('');
//     setQuestion('');
//     resetTranscript();
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async function () {
//         const typedArray = new Uint8Array(this.result);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         let textContent = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const text = await page.getTextContent();
//           textContent += text.items.map(item => item.str).join(' ');
//         }
//         GptPosting(`Summarize the following content: ${textContent}`);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div className='flex'>
//       <div className='h-screen p-3 border-2 border-gray hidden md:block'>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5' onClick={handleNewChat}>
//           <img className="mr-4" src='plus.pn' alt='new' />New Chat
//         </button>
//         <label className='ml-5 p-3 flex bg-pink-300 gap-4 font-bold rounded-lg w-64 mt-5 cursor-pointer'>
//           <img src='file.png' alt='file' />File
//           <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
//         </label>
//       </div>
//       <div className='border-1 w-1/2 mx-auto p-10 h-screen'>
//         <div className='overflow-y-scroll h-[750px]'>
//           <img className="w-12 h-12 mx-auto" src='giga.jpeg' alt='img' />
//           <div className='flex text-center w-72 mx-auto'>
//             <h1 className='font-bold mb-5'>✨✨ Skill Recco,</h1>
//             <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>Resume Synthesizer</a>
//           </div>
//           <div className='flex p-2 gap-4 '>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is RAG in computer science?')}>What is RAG in ML?</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is the best career path recommendations?')}>What is the best career path recommendations?</button>
//           </div>
//           <div className='flex p-2 gap-4'>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('Good career path for non-technical student')}>Good career path for non-technical student</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('How can I make my career better?')}>How can I make my career better?</button>
//           </div>
          
//           {loading && (
//             <div className="thinking-message">
//               <strong>Skill Recco Thinking...</strong>
//             </div>
//           )}
          
//           {history.length > 0 && (
//             <div className="history">
//               {history.map((item, index) => (
//                 <div key={index} className="history-item">
//                   <div className='flex' style={{ lineHeight: "40px" }}>
//                     <div className='w-12 h-12 rounded-full text-center' style={{ lineHeight: "38px" }}><img src="user.png" alt='' /></div>
//                     <div className='ml-3'>{item.question}</div>
//                   </div>
//                   <div className='flex'>
//                     <strong className='text-blue-300'>Ans:</strong>
//                     <div className='ml-3' dangerouslySetInnerHTML={{ __html: item.answer }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <form className='flex' onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className='w-11/12 border-2 p-1 pl-3 border-none rounded-lg'
//             value={question}
//             style={{borderBottom:"0.5px solid grey",borderLeft:""}}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter your question..."
//             required
//           />
//           <button className='hover:bg-blue-300 p-2 rounded-lg ml-2' style={{lineHeight:"20px"}} type="button" onClick={handleStartListening}>
//             <img className='mt-3' src='mic.svg' alt='' />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Gpt;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// function Gpt() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   useEffect(() => {
//     setQuestion(transcript);
//   }, [transcript]);

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const apiKey = "sk-proj-";
//   const apiUrl = "https://api.openai.com/v1/chat/completions";

//   const formatResponse = (response) => {
//     let formattedResponse = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
//     const boldBeforeColonRegex = /([^:]*):\s([^<]*)/g;
//     formattedResponse = formattedResponse.replace(boldBeforeColonRegex, '<strong>$1</strong>: $2');
//     const heading1Regex = /^#\s(.*)$/gm;
//     const heading2Regex = /^##\s(.*)$/gm;
//     const heading3Regex = /^###\s(.*)$/gm;
//     formattedResponse = formattedResponse.replace(heading1Regex, '<h1><strong>$1</strong></h1>');
//     formattedResponse = formattedResponse.replace(heading2Regex, '<h2><strong>$1</strong></h2>');
//     formattedResponse = formattedResponse.replace(heading3Regex, '<h3><strong>$1</strong></h3>');
//     return formattedResponse;
//   };

//   const GptPosting = async (currentQuestion) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         apiUrl,
//         {
//           model: 'gpt-3.5-turbo-0125',
//           messages: [{ role: 'user', content: currentQuestion }],
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const rawAnswer = response.data.choices[0].message.content;
//       const formattedAnswer = formatResponse(rawAnswer);
//       setAnswer(formattedAnswer);
//       setHistory((prevHistory) => [...prevHistory, { question: currentQuestion, answer: formattedAnswer }]);
//     } catch (error) {
//       console.error('Error asking question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (question.trim()) {
//       await GptPosting(question);
//       setQuestion('');
//     }
//   };

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//     }, 10000); // Stop listening after 10 seconds
//   };

//   const handleButtonClick = async (buttonQuestion) => {
//     await GptPosting(buttonQuestion);
//   };

//   const handleNewChat = () => {
//     setHistory([]);
//     setAnswer('');
//     setQuestion('');
//     resetTranscript();
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async function () {
//         const typedArray = new Uint8Array(this.result);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         let textContent = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const text = await page.getTextContent();
//           textContent += text.items.map(item => item.str).join(' ');
//         }
//         GptPosting(`Summarize the following content: ${textContent}`);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div className='flex'>
//       <div className='h-screen p-3 border-2 border-gray hidden md:block'>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5' onClick={handleNewChat}>
//           <img className="mr-4" src='plus.pn' alt='new' />New Chat
//         </button>

//         <label className='ml-5 p-3 flex bg-pink-300 gap-4 font-bold rounded-lg w-64 mt-5 cursor-pointer'>
//           <img src='file.png' alt='file' />File
//           <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
//         </label>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5'>
//           <img  className="w-6 h-6 mr-3"   src='lang.png' alt='' />
//           <select className='pl-3 pr-3'>
//             <option>telugu</option>
//             <option>hindi</option>
//             <option>english</option>
//             <option>marati</option>
//           </select>
//         </button>
//       </div>
//       <div className='border-1 w-1/2 mx-auto p-10 h-screen'>
//         <div className='overflow-y-scroll h-[750px]'>
//           <img className="w-12 h-12 mx-auto" src='giga.jpeg' alt='img' />
//           <div className='flex text-center w-72 mx-auto'>
//             <h1 className='font-bold mb-5'>✨✨ Skill Recco,</h1>
//             <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>Resume Synthesizer</a>
//           </div>
//           <div className='flex p-2 gap-4 '>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is RAG in computer science?')}>What is RAG in ML?</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is the best career path recommendations?')}>What is the best career path recommendations?</button>
//           </div>
//           <div className='flex p-2 gap-4'>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('Good career path for non-technical student')}>Good career path for non-technical student</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('How can I make my career better?')}>How can I make my career better?</button>
//           </div>
          
//           {loading && (
//             <div className="thinking-message">
//               <strong>Skill Recco Thinking...</strong>
//             </div>
//           )}
          
//           {history.length > 0 && (
//             <div className="history">
//               {history.map((item, index) => (
//                 <div key={index} className="history-item">
//                   <div className='flex' style={{ lineHeight: "40px" }}>
//                     <div className='w-12 h-12 rounded-full text-center' style={{ lineHeight: "38px" }}><img src="user.png" alt='' /></div>
//                     <div className='ml-3'>{item.question}</div>
//                   </div>
//                   <div className='flex'>
//                     <strong className='text-blue-300'>Ans:</strong>
//                     <div className='ml-3' dangerouslySetInnerHTML={{ __html: item.answer }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <form className='flex' onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className='w-11/12 border-2 p-1 pl-3 border-none rounded-lg'
//             value={question}
//             style={{borderBottom:"0.5px solid grey",borderLeft:""}}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter your question..."
//             required
//           />
//           <button className='hover:bg-blue-300 p-2 rounded-lg ml-2' style={{lineHeight:"20px"}} type="button" onClick={handleStartListening}>
//             <img className='mt-3' src='mic.svg' alt='' />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Gpt;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import { useTranslation } from 'react-i18next'; // Import the hook

// pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// function Gpt() {
//   const { t, i18n } = useTranslation(); // Use the translation hook

//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   useEffect(() => {
//     setQuestion(transcript);
//   }, [transcript]);

//   if (!browserSupportsSpeechRecognition) {
//     return <span>{t('browserSupportError')}</span>;
//   }

//   const apiKey = "sk-proj-";
//   const apiUrl = "https://api.openai.com/v1/chat/completions";

//   const formatResponse = (response) => {
//     let formattedResponse = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
//     const boldBeforeColonRegex = /([^:]*):\s([^<]*)/g;
//     formattedResponse = formattedResponse.replace(boldBeforeColonRegex, '<strong>$1</strong>: $2');
//     const heading1Regex = /^#\s(.*)$/gm;
//     const heading2Regex = /^##\s(.*)$/gm;
//     const heading3Regex = /^###\s(.*)$/gm;
//     formattedResponse = formattedResponse.replace(heading1Regex, '<h1><strong>$1</strong></h1>');
//     formattedResponse = formattedResponse.replace(heading2Regex, '<h2><strong>$1</strong></h2>');
//     formattedResponse = formattedResponse.replace(heading3Regex, '<h3><strong>$1</strong></h3>');
//     return formattedResponse;
//   };

//   const GptPosting = async (currentQuestion) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         apiUrl,
//         {
//           model: 'gpt-3.5-turbo-0125',
//           messages: [{ role: 'user', content: currentQuestion }],
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const rawAnswer = response.data.choices[0].message.content;
//       const formattedAnswer = formatResponse(rawAnswer);
//       setAnswer(formattedAnswer);
//       setHistory((prevHistory) => [...prevHistory, { question: currentQuestion, answer: formattedAnswer }]);
//     } catch (error) {
//       console.error('Error asking question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (question.trim()) {
//       await GptPosting(question);
//       setQuestion('');
//     }
//   };

//   const handleStartListening = () => {
//     SpeechRecognition.startListening();
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//     }, 10000); // Stop listening after 10 seconds
//   };

//   const handleButtonClick = async (buttonQuestion) => {
//     await GptPosting(buttonQuestion);
//   };

//   const handleNewChat = () => {
//     setHistory([]);
//     setAnswer('');
//     setQuestion('');
//     resetTranscript();
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async function () {
//         const typedArray = new Uint8Array(this.result);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         let textContent = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const text = await page.getTextContent();
//           textContent += text.items.map(item => item.str).join(' ');
//         }
//         GptPosting(`Summarize the following content: ${textContent}`);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const handleLanguageChange = (event) => {
//     i18n.changeLanguage(event.target.value);
//   };

//   return (
//     <div className='flex'>
//       <div className='h-screen p-3 border-2 border-gray hidden md:block'>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5' onClick={handleNewChat}>
//           <img className="mr-4" src='plus.pn' alt='new' />{t('newChat')}
//         </button>

//         <label className='ml-5 p-3 flex bg-pink-300 gap-4 font-bold rounded-lg w-64 mt-5 cursor-pointer'>
//           <img src='file.png' alt='file' />{t('file')}
//           <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
//         </label>
//         <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5'>
//           <img  className="w-6 h-6 mr-3"   src='lang.png' alt='' />
//           <select className='pl-3 pr-3' onChange={handleLanguageChange}>
//             <option value="te">{t('telugu')}</option>
//             <option value="hi">{t('hindi')}</option>
//             <option value="en">{t('english')}</option>
//             <option value="mr">{t('marathi')}</option>
//           </select>
//         </button>
//       </div>
//       <div className='border-1 w-1/2 mx-auto p-10 h-screen'>
//         <div className='overflow-y-scroll h-[750px]'>
//           <img className="w-12 h-12 mx-auto" src='giga.jpeg' alt='img' />
//           <div className='flex text-center w-72 mx-auto'>
//             <h1 className='font-bold mb-5'>✨✨ {t('skillRecco')},</h1>
//             <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>{t('resumeSynthesizer')}</a>
//           </div>
//           <div className='flex p-2 gap-4 '>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick(t('buttonText.rag'))}>{t('buttonText.rag')}</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick(t('buttonText.careerRecommendations'))}>{t('buttonText.careerRecommendations')}</button>
//           </div>
//           <div className='flex p-2 gap-4'>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick(t('buttonText.nonTechnical'))}>{t('buttonText.nonTechnical')}</button>
//             <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick(t('buttonText.improveCareer'))}>{t('buttonText.improveCareer')}</button>
//           </div>
          
//           {loading && (
//             <div className="thinking-message">
//               <strong>{t('thinking')}</strong>
//             </div>
//           )}
          
//           {history.length > 0 && (
//             <div className="history">
//               {history.map((item, index) => (
//                 <div key={index} className="history-item">
//                   <div className='flex' style={{ lineHeight: "40px" }}>
//                     <div className='w-12 h-12 rounded-full text-center' style={{ lineHeight: "38px" }}><img src="user.png" alt='' /></div>
//                     <div className='ml-3'>{item.question}</div>
//                   </div>
//                   <div className='flex'>
//                     <strong className='text-blue-300'>Ans:</strong>
//                     <div className='ml-3' dangerouslySetInnerHTML={{ __html: item.answer }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <form className='flex' onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className='w-11/12 border-2 p-1 pl-3 border-none rounded-lg'
//             value={question}
//             style={{borderBottom:"0.5px solid grey",borderLeft:""}}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder={t('enterQuestion')}
//             required
//           />
//           <button className='hover:bg-blue-300 p-2 rounded-lg ml-2' style={{lineHeight:"20px"}} type="button" onClick={handleStartListening}>
//             <img className='mt-3' src='mic.svg' alt='' />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Gpt;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

function Gpt() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english'); // Default language

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setQuestion(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const apiKey = "sk-proj-";
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const formatResponse = (response) => {
    let formattedResponse = response.replace(/(?:\r\n|\r|\n)/g, '<br>');
    const boldBeforeColonRegex = /([^:]*):\s([^<]*)/g;
    formattedResponse = formattedResponse.replace(boldBeforeColonRegex, '<strong>$1</strong>: $2');
    const heading1Regex = /^#\s(.*)$/gm;
    const heading2Regex = /^##\s(.*)$/gm;
    const heading3Regex = /^###\s(.*)$/gm;
    formattedResponse = formattedResponse.replace(heading1Regex, '<h1><strong>$1</strong></h1>');
    formattedResponse = formattedResponse.replace(heading2Regex, '<h2><strong>$1</strong></h2>');
    formattedResponse = formattedResponse.replace(heading3Regex, '<h3><strong>$1</strong></h3>');
    return formattedResponse;
  };

  const GptPosting = async (currentQuestion) => {
    setLoading(true);
    try {
      const prompt = `Translate the following question into ${language}: ${currentQuestion}`; // Ensure GPT understands the language
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const rawAnswer = response.data.choices[0].message.content;
      const formattedAnswer = formatResponse(rawAnswer);
      setAnswer(formattedAnswer);
      setHistory((prevHistory) => [...prevHistory, { question: currentQuestion, answer: formattedAnswer }]);
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question.trim()) {
      await GptPosting(question);
      setQuestion('');
    }
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening();
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 10000); // Stop listening after 10 seconds
  };

  const handleButtonClick = async (buttonQuestion) => {
    await GptPosting(buttonQuestion);
  };

  const handleNewChat = () => {
    setHistory([]);
    setAnswer('');
    setQuestion('');
    resetTranscript();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let textContent = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          textContent += text.items.map(item => item.str).join(' ');
        }
        GptPosting(`Summarize the following content in ${language}: ${textContent}`);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className='flex'>
      <div className='h-screen p-3 border-2 border-gray hidden md:block'>
        <button className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5' onClick={handleNewChat}>
          <img className="mr-4" src='plus.png' alt='new' />New Chat
        </button>

        <label className='ml-5 p-3 flex bg-pink-300 gap-4 font-bold rounded-lg w-64 mt-5 cursor-pointer'>
          <img src='file.png' alt='file' />File
          <input type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
        <div className='ml-5 p-3 flex bg-pink-300 font-bold rounded-lg w-64 mt-5'>
          <img className="w-6 h-6 mr-3" src='lang.png' alt='' />
          <select className='pl-3 pr-3' value={language} onChange={handleLanguageChange}>
            <option value="telugu">Telugu</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="marathi">Marathi</option>
          </select>
        </div>
      </div>
      <div className='border-1 w-1/2 mx-auto p-10 h-screen'>
        <div className='overflow-y-scroll h-[750px]'>
          <img className="w-12 h-12 mx-auto" src='giga.jpeg' alt='img' />
          <div className='flex text-center w-72 mx-auto'>
            <h1 className='font-bold mb-5'>✨✨ Skill Recco,</h1>
            <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>Resume Synthesizer</a>
          </div>
          <div className='flex p-2 gap-4 '>
            <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is RAG in computer science?')}>What is RAG in ML?</button>
            <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('What is the best career path recommendations?')}>What is the best career path recommendations?</button>
          </div>
          <div className='flex p-2 gap-4'>
            <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('Good career path for non-technical student')}>Good career path for non-technical student</button>
            <button className='bg-blue-300 p-3 rounded-lg' onClick={() => handleButtonClick('How can I make my career better?')}>How can I make my career better?</button>
          </div>
          
          {loading && (
            <div className="thinking-message">
              <strong>Skill Recco Thinking...</strong>
            </div>
          )}
          
          {history.length > 0 && (
            <div className="history">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className='flex' style={{ lineHeight: "40px" }}>
                    <div className='w-12 h-12 rounded-full text-center' style={{ lineHeight: "38px" }}><img src="user.png" alt='' /></div>
                    <div className='ml-3'>{item.question}</div>
                  </div>
                  <div className='flex'>
                    <strong className='text-blue-300'>Ans:</strong>
                    <div className='ml-3' dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className="flex items-center p-1 bg-pink-200 rounded-lg">
            <input
              className="outline-none w-full bg-pink-200 p-2"
              type="text"
              placeholder="Type your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="button"
              className="ml-2 p-2"
              onClick={handleStartListening}
            >
              {listening ? 'Listening...' : '🎤 Start'}
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Gpt;
