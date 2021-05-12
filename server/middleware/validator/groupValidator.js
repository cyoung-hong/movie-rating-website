import {body} from 'express-validator';
import Group from "../../models/Group.js";

const roleCheck = (user, group) => {
  const member = group.members.find((m) => m.username === user.username);
  return member?.role;
};


export const groupExists = (value) => {
    return Group.findOne({ groupName: value.groupName }).then((group) => {
        if (!group) {
          return Promise.reject("Group does not exist");
        }
      });
}

export const isAdmin = (value) => {
  const {group, user} = value;
  
  const existingGroup = Group.findOne({groupName: value.groupName})
}