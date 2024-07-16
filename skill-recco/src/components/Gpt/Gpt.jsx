
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Gpt() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const apiKey = "sk-proj- api-key";
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
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [{ role: 'user', content: currentQuestion }],
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

  return (
    <div className='flex'>
      <div className='h-screen p-3 border-2 border-gray'>
        <button className='ml-5 p-3 flex bg-pink-300 rounded-[10px] w-[250px] mt-5' onClick={handleNewChat}>
          <img className="mr-4" src='plus.pn' alt='new' />New Chat
        </button>
      </div>
      <div className='border-1 w-[50%] m-auto p-10 h-100vh'>
        <div className='overflow-y-scroll h-[750px]'>
          <img className="w-[50px] h-[50px] m-auto" src='giga.jpeg' alt='img' />
          <div className='flex text-center w-[300px] m-auto'>
            <h1 className='font-bold mb-5'>✨✨ Skill Recco,</h1>
            <a href='https://app.chipp.ai/applications/5453/build' className='text-blue-400'>Resume Synthesizer</a>
          </div>
          <div className='flex p-2 gap-4 '>
            <button className='bg-blue-300 p-3 rounded-[10px]' onClick={() => handleButtonClick('What is RAG in computer science?')}>What is RAG in ML?</button>
            <button className='bg-blue-300 p-3 rounded-[10px]' onClick={() => handleButtonClick('What is the best career path recommendations?')}>What is the best career path recommendations?</button>
          </div>
          <div className='flex p-2 gap-4'>
            <button className='bg-blue-300 p-3 rounded-[10px]' onClick={() => handleButtonClick('Good career path for non-technical student')}>Good career path for non-technical student</button>
            <button className='bg-blue-300 p-3 rounded-[10px]' onClick={() => handleButtonClick('How can I make my career better?')}>How can I make my career better?</button>
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
                    <div className='bg-pink-300 w-[50px] text-center h-[50px] border-2 rounded-[50%]' style={{ lineHeight: "38px" }}>You</div>
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

        <form className='flex' onSubmit={handleSubmit}>
          <input
            type="text"
            className='w-[90%] border-2 p-1 pl-3 border-none rounded-[10px]'
            value={question}
            style={{borderBottom:"0.5px solid grey",borderLeft:"0.5px solid grey"}}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            required
          />
          <button className='hover:bg-blue-300 p-2 rounded-10 ml-2 rounded-[10px] ' style={{lineHeight:"20px"}} type="button" onClick={handleStartListening}>
            <img className='mt-3' src='mic.svg' alt='' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Gpt;
