import { Global } from "@emotion/react";

const Fonts = () => (
    <Global
        styles={`
        @font-face {
            font-family: "nexonLight";
            src: url("/public/fonts/NEXONLv1GothicLight.ttf") format("ttf");
        }
        
        @font-face {
            font-family: "nexonRegular";
            src: url("/public/fonts/NEXONLv1GothicRegular.ttf") format("ttf");
        }
        
        @font-face {
            font-family: "nexonBold";
            src: url("/public/fonts/NEXONLv1GothicBold.ttf") format("ttf");
        }
      `}
    />
);

export default Fonts;
