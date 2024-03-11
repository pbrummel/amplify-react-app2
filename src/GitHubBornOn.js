import React, { useState, useEffect } from 'react';

const GitHubBornOn = () => {
  const [bornOnDate, setBornOnDate] = useState('');
  const [loading, setLoading] = useState(true);
  const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];
  const googleBlue = '#4285F4';
  const googleGreen = '#34A853';

  const createColoredSpans = (text) => {
    const words = text.split(' ');
    return words.map((word, index) => (
      <span key={index} style={{ color: googleColors[index % googleColors.length] }}>
        {word}{' '}
      </span>
    ));
  };
  

  useEffect(() => {
    const fetchGitHubInfo = async () => {
      try {
        const response = await fetch('https://api.github.com/users/pbrummel');
        const data = await response.json();
        setBornOnDate(data.created_at);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub born-on date:', error);
        setLoading(false);
      }
    };

    fetchGitHubInfo();
  }, []);

  return (
    <div>
      <br/>
      <p>
        <span style={{ fontWeight: 'bold', color: googleBlue }}>Peter B first used Github on:</span> <span style={{ fontWeight: 'bold', color: googleGreen }}>{bornOnDate}</span>
      </p>
    </div>
  );
};

export default GitHubBornOn;
