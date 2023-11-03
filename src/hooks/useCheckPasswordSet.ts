import { useEffect } from "react";
import { navigate } from "gatsby";

import { isPasswordSet } from "utils/isPasswordSet";

const useCheckPasswordSet = () => {
  const passwordIsSet = isPasswordSet();
  useEffect(() => {
    if (passwordIsSet) {
      return;
    }
    navigate("/");
  }, [passwordIsSet]);
};

export default useCheckPasswordSet;
