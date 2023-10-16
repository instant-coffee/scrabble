
export type BoardCell = string | null

export interface Candidate {
    letters: string
    row: number
    col: number
}

const fetchGameData = async (level: string) => {
    try {
        const response = await fetch('https://scrabble-client.vercel.app/api/scrabble/level', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ level }),
        });
    
        if (!response.ok) {
          throw new Error('NOPE!!');
        }

        return await response.json();
    } catch (error) {
    throw new Error(`OH DAMN: ${error}`);
    }
};

export {fetchGameData};