import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random) * surpriseMePrompts.length;
    const randomPrompt = surpriseMePrompts[randomIndex];

    return randomPrompt;
}

export const downloadImage = async(prompt, photo) => {
    FileSaver.saveAs(photo, `download_Emage_${prompt.slice(0, 15)}.png`);
}