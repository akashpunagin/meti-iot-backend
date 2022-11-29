const missingCredsMessage = "Missing Credentials";
const invalidCredsMessage = "Invalid Credentials";
const invalidEmailMessage = "Invalid Email";

// TODO edit whole file
function isValidEmail(userEmail) {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    userEmail
  );
  return isValidEmail;
}

function handleAuthReq(req) {
  const {
    userId,
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contact_number,
    password,
  } = req.body;

  if (req.path === "/register-customer") {
    if (
      ![
        email,
        firstName,
        lastName,
        country,
        state,
        city,
        zip,
        address,
        contact_number,
        password,
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/register-admin") {
    if (
      ![
        email,
        firstName,
        lastName,
        country,
        state,
        city,
        zip,
        address,
        contact_number,
        password,
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/delete-user") {
    if (![userId].every(Boolean)) {
      return missingCredsMessage;
    }
  }

  if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/send-confirmation-email") {
    if (![userId].every(Boolean)) {
      return missingCredsMessage;
    }
  }
}

// function handleProgramReq(req) {
//   const { programName, programId } = req.body;

//   if (req.originalUrl === "/program/add") {
//     if (![programName].every(Boolean)) {
//       return missingCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/program/delete") {
//     if (![programId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![programId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/program/edit") {
//     if (![programId, programName].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![programId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }
// }

// function handleDepartmentReq(req) {
//   const { departmentName, departmentId } = req.body;

//   if (req.originalUrl === "/department/add") {
//     if (![departmentName].every(Boolean)) {
//       return missingCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/department/delete") {
//     if (![departmentId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![departmentId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/department/edit") {
//     if (![departmentId, departmentName].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![departmentId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }
// }

// function handleGroupReq(req) {
//   const { groupName, groupDescription, groupId } = req.body;

//   if (req.originalUrl === "/group/add") {
//     if (![groupName, groupDescription].every(Boolean)) {
//       return missingCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/group/delete") {
//     if (![groupId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![groupId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/group/edit") {
//     if (![groupId, groupName, groupDescription].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![groupId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }
// }

// function handleUserGroupReq(req) {
//   const { userId, groupId } = req.body;

//   if (req.originalUrl === "/group/user/add") {
//     if (![userId, groupId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![groupId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/group/user/remove") {
//     if (![userId, groupId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![groupId].every((i) => Number.isInteger(i))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/group/user/get-by-user-id") {
//     if (![userId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//   }
// }

// function handleTweetReq(req) {
//   const { tweetText, groupIds, fileLinkUrl, fileLinkLabel } = req.body;

//   if (req.originalUrl === "/tweet/add") {
//     if (![tweetText, groupIds].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![groupIds].every((i) => Array.isArray(i) && i.length !== 0)) {
//       return invalidCredsMessage;
//     }
//     if (fileLinkUrl || fileLinkLabel) {
//       if (!isFileLinkCredsPresent(fileLinkUrl, fileLinkLabel)) {
//         return missingCredsMessage;
//       }
//     }
//   }
// }

// function handleUserUpdateReq(req) {
//   const {
//     firstName,
//     lastName,
//     programId,
//     departmentId,
//     userId,
//     isViewTweet,
//     isSendTweet,
//     role,
//   } = req.body;

//   console.log(req.originalUrl);

//   if (req.originalUrl === "/user/update/profile") {
//     if (![firstName, lastName].every(Boolean)) {
//       return missingCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/user/update/program") {
//     if (![programId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![programId].every((e) => Number.isInteger(e))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/user/update/department") {
//     if (![departmentId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![departmentId].every((e) => Number.isInteger(e))) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/user/update/permission") {
//     if (![userId].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (![isViewTweet, isSendTweet].every((e) => typeof e === "boolean")) {
//       return invalidCredsMessage;
//     }
//   }

//   if (req.originalUrl === "/user/update/role") {
//     if (![userId, role].every(Boolean)) {
//       return missingCredsMessage;
//     }
//     if (isValidRole(role)) {
//       return invalidCredsMessage;
//     }
//   }
// }

module.exports = (req, res, next) => {
  const authError = handleAuthReq(req);
  // const programError = handleProgramReq(req);
  // const departmentError = handleDepartmentReq(req);
  // const groupError = handleGroupReq(req);
  // const userGroupError = handleUserGroupReq(req);
  // const tweetError = handleTweetReq(req);
  // const userUpdateError = handleUserUpdateReq(req);

  if (authError) {
    return res.status(401).json({ error: authError });
  }
  // if (programError) {
  //   return res.status(403).json({ error: programError });
  // }
  // if (departmentError) {
  //   return res.status(403).json({ error: departmentError });
  // }
  // if (groupError) {
  //   return res.status(403).json({ error: groupError });
  // }
  // if (userGroupError) {
  //   return res.status(403).json({ error: userGroupError });
  // }
  // if (tweetError) {
  //   return res.status(403).json({ error: tweetError });
  // }
  // if (userUpdateError) {
  //   return res.status(403).json({ error: userUpdateError });
  // }

  next();
};
