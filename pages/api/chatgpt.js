import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

var basePromptPrefix = `Create a solidity smart contract for `;
var selectOpenZeppelin = "";
var versionUser = " use solidity version 0.8.17";
const chatGPT = async (req, res) => {

    if(req.body.checked == true) {
        selectOpenZeppelin = ` Using OpenZeppelin`;
    }

    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}${selectOpenZeppelin}${versionUser}`,
      temperature: 0.6,
      max_tokens: 4000,
    });

    const data_output = baseCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: data_output });
};

export default chatGPT;