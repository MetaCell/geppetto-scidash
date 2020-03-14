import React from 'react';
import EmbedContainer from 'react-oembed-container';


const Instructions = () => (
  <EmbedContainer markup={''}>

    <p>This is a test <strong>bold</strong> <em>italic</em> <s>stripe</s>\xa0normal <a
      href="https://www.youtube.com/watch?v=CrTMc2i6Lzc&amp;list=RDCrTMc2i6Lzc&amp;start_radio=1"
      onClick="window.open(this.href, \'\', \'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no\'); return false;">link</a>\n
    </p>\n<p>\xa0</p>\n<p>\xa0</p>\n
    <p>
      <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""
        frameBorder="0" height="270" src="https://www.youtube.com/embed/CrTMc2i6Lzc?feature=oembed"
        width="480"></iframe>
    </p>
    \n<p>\xa0</p>
  </EmbedContainer>
)

export default Instructions;
