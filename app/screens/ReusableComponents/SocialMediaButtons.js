import React from "react";

import CustomButton from "./CustomButton";

const SocialMediaButtons = () => {
  const onSignInFacebook = () => {
    // navigation.navigate("")
    console.warn("Connect with Facebook");
  };
  const onSignInGoogle = () => {
    // navigation.navigate("")
    console.warn("Connect with Google");
  };
  return (
    <>
      <CustomButton
        btnText={"Connect with Facebook"}
        onPress={onSignInFacebook}
        bgColor="#3B5998"
      />
      <CustomButton
        btnText={"Connect with Google"}
        onPress={onSignInGoogle}
        bgColor="white"
        fgColor="black"
        type={"outline"}
      />
    </>
  );
};

export default SocialMediaButtons;
