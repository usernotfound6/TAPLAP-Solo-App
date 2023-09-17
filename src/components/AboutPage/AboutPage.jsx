import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Card elevation={24} sx={{  backgroundColor: "beige", maxWidth: 600, margin: "auto", marginTop: 6, padding: 2, borderRadius: 10}}>
      <CardContent>
        <Typography sx={{ backgroundColor: "beige", marginTop: -1}}variant="h5" gutterBottom>
          My Story:
        </Typography>
        <Typography variant="body2">
          "Born in the vibrant land of Ethiopia, my journey took an unexpected
          twist when I was raised in the chilly embrace of Minnesota. From the
          warmth of Addis Ababa to the frozen lakes of the North Star State,
          life sculpted me into a seeker of connections. As a young man, I found
          solace in technology and a voice through coding. The idea sparked when
          I realized the world needed a platform for genuine sharing—a place to
          articulate struggles and triumphs, unfiltered and sincere. Amid the
          hotdish dinners and freezing winters, I embarked on a mission. With
          lines of code and a vision in my heart, I'm crafting a website where
          people from all walks of life can communicate their stories. It's a
          digital hearth where we gather to share the embers of our experiences.
          In this melting pot of cultures and dreams, I hope to bridge the gap
          between worlds and bring us all a bit closer. Ethiopia, Minnesota, and
          beyond, let's unite in sharing our struggles, celebrating our
          achievements, and weaving a tapestry of human connection—one heartfelt 
          message at a time."
        </Typography>
      </CardContent>
      <img
        src="https://scontent-msp1-1.xx.fbcdn.net/v/t1.6435-9/76751451_10162589068800182_8654721343276711936_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Nh95DpfIrLUAX-7gehL&_nc_ht=scontent-msp1-1.xx&oh=00_AfBp5MtSg0wu0kKanXykHJYU98tuMkxs1WD4a468mzpdBw&oe=65207442"
        alt="My Photo"
      />
      <img src={require('./YARD.jpg')}/>
    </Card>
  );
}

export default AboutPage;
