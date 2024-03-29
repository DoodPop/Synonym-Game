const express = require('express');
const app = express();
const mysql = require('mysql2')
const cors = require('cors')
const db = mysql.createPool({
    host: 'mysql-2d13b6b8-mysql-server123412.a.aivencloud.com',
    user: 'AVNS_Yx9Skeu6PHhFJN9WmN4',
    port: 3306,
    password: 'password',
    database: 'wordchest',
  
});

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    const sql = `
      SELECT
        w.wordName,
        GROUP_CONCAT(s.synonym_word) AS synonyms,
        GROUP_CONCAT(d.distract_word) AS distractors
      FROM word w
      LEFT JOIN synonyms s ON w.id = s.word_id
      LEFT JOIN distractors d ON w.id = d.word_id
      GROUP BY w.wordName
      ORDER BY RAND()
      LIMIT 1
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.length === 0) {
          res.status(404).send('No words found');
        } else {
          const { wordName, synonyms, distractors } = result[0];
          const randomSynonym = synonyms ? getRandomSynonym(synonyms) : null;
          const randomDistractors = getRandomDistractors(distractors, 5);

          res.json({ wordName, synonyms: randomSynonym, randomDistractors });
        }
      }
    });
  });
  
function getRandomSynonym(synonyms) {
const synonymArray = synonyms.split(',');
const randomIndex = Math.floor(Math.random() * synonymArray.length);
return synonymArray[randomIndex];
}

function getRandomDistractors(words, count) {
  
  const wordArray = words.split(',');

  
  const selectedWords = [];

  for (let i = 0; i < count; i++) {
    const word = wordArray[Math.floor(Math.random() * wordArray.length)];

    
    if (!selectedWords.includes(word)) {
      selectedWords.push(word);
    } else {
     
      i--;
    }
  }

  return selectedWords;
}

app.listen(3001, () => {
    console.log("running on port 3001");
});
