import React, { useState, useEffect } from 'react';

const InfoBoard = ({
  refreshCount,
  banList,
  setBanList,
  seenList,
  setSeenList,
}) => {
  const [dog, setDog] = useState({ breeds: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      let dogData = { breeds: [] };
      while (
        dogData.breeds.length === 0 ||
        banList.includes(dogData.breeds[0]?.name) ||
        seenList.includes(dogData.breeds[0]?.name)
      ) {
        const response = await fetch(
          'https://api.thedogapi.com/v1/images/search?api_key=live_WPWMRKRBgbNHSBtQbvHiC8W5LRgYMqPSYatCThxwkforH6qBMsG6GmPaos75c9xC'
        );
        const data = await response.json();
        dogData = data[0];
      }
      setDog(dogData);
      setLoading(false);
      if (!seenList.includes(dogData.breeds[0]?.name))
        setSeenList([...seenList, dogData.breeds[0]?.name]);
    };

    fetchDog();
  }, []);

  // Function to add clicked feature to banList
  const handleBan = (item) => {
    if (!banList.includes(item)) {
      setBanList([...banList, item]); // Add new item to banList
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dog-info">
          <div className="labels-container">
            {/* Define the features you want to display */}
            {[
              { label: dog.breeds[0]?.name, key: 'name' },
              { label: dog.breeds[0]?.bred_for, key: 'bred_for' },
              { label: dog.breeds[0]?.breed_group, key: 'breed_group' },
              {
                label: dog.breeds[0]?.weight?.imperial
                  ? `${dog.breeds[0].weight.imperial} lbs`
                  : null,
                key: 'weight',
              },
            ].map((feature) =>
              feature.label ? (
                <button
                  key={feature.key}
                  onClick={() => handleBan(feature.label)}
                >
                  {feature.label}
                </button>
              ) : null
            )}
          </div>

          {/* Render the dog's image */}
          <img
            src={dog.url}
            alt={dog.breeds[0]?.name || 'Dog'}
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        </div>
      )}
    </>
  );
};

export default InfoBoard;
