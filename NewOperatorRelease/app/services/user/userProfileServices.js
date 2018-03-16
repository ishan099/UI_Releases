/**
 * Created by dinusha on 6/11/2016.
 */

(function () {

    var userProfileApiAccess = function ($http, baseUrls) {

        var getProfileByName = function (user) {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'User/' + user + '/profile'

            }).then(function (resp) {
                return resp.data;
            })
        };

        var getUsers = function () {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'Users'
            }).then(function (resp) {
                return resp.data;
            })
        };

        var addContactToProfile = function (user, contact, type) {
            return $http({
                method: 'PUT',
                url: baseUrls.userServiceBaseUrl + 'User/' + user + '/profile/contact/' + contact,
                data: {
                    type: type
                }
            }).then(function (resp) {
                return resp.data;
            })
        };

        var addUser = function (userObj) {
            var jsonStr = JSON.stringify(userObj);
            return $http({
                method: 'POST',
                url: baseUrls.userServiceBaseUrl + 'User',
                data: jsonStr
            }).then(function (resp) {
                return resp.data;
            })
        };

        var updateProfile = function (user, profileInfo) {
            delete profileInfo.email;
            profileInfo.birthday = profileInfo.dob.year + "-" + profileInfo.dob.month + "-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);
            return $http({
                method: 'PUT',
                url: baseUrls.userServiceBaseUrl + 'User/' + user + '/profile',
                data: jsonStr
            }).then(function (resp) {
                return resp.data;
            })
        };

        var deleteContactFromProfile = function (user, contact) {
            return $http({
                method: 'DELETE',
                url: baseUrls.userServiceBaseUrl + 'User/' + user + '/profile/contact/' + contact
            }).then(function (resp) {
                return resp.data;
            })
        };

        var deleteUser = function (username) {
            return $http({
                method: 'DELETE',
                url: baseUrls.userServiceBaseUrl + 'User/' + username
            }).then(function (resp) {
                return resp.data;
            })
        };

        var getUserGroups = function () {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'UserGroups'
            }).then(function (resp) {
                return resp.data;
            })
        };
        var getGroupMembers = function (groupID) {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'UserGroup/' + groupID + "/members",
            }).then(function (resp) {
                return resp.data;
            })
        };
        var addUserGroup = function (userObj) {
            return $http({
                method: 'POST',
                url: baseUrls.userServiceBaseUrl + 'UserGroup',
                data: userObj
            }).then(function (resp) {
                return resp.data;
            })
        };
        var removeUserFromGroup = function (gripID, userID) {
            return $http({
                method: 'DELETE',
                url: baseUrls.userServiceBaseUrl + 'UserGroup/' + gripID + "/User/" + userID
            }).then(function (resp) {
                return resp.data;
            })
        };
        var addMemberToGroup = function (gripID, userID) {
            return $http({
                method: 'PUT',
                url: baseUrls.userServiceBaseUrl + 'UserGroup/' + gripID + "/User/" + userID
            }).then(function (resp) {
                return resp.data;
            })
        };


        /*-------- function my profile ------------*/
        var getMyProfile = function () {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'Myprofile'
            }).then(function (resp) {
                return resp.data;
            })
        };


        var updateMyProfile = function (profileInfo) {
            profileInfo.birthday = profileInfo.dob.year + "-" + profileInfo.dob.month + "-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);
            return $http({
                method: 'PUT',
                url: baseUrls.userServiceBaseUrl + 'Myprofile',
                data: jsonStr
            }).then(function (resp) {
                return resp.data;
            })
        };

        var getMyRatings = function (owner) {
            return $http({
                method: 'GET',
                url: baseUrls.qaModule + 'QuestionPaperSubmission/Owner/' + owner + '/Completed/true',
            }).then(function (resp) {
                return resp.data;
            })
        };

        var getOrganization = function () {
            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'Organisation'
            }).then(function (resp) {
                return resp.data;
            })
        };

        var getMyOrganization = function(companyId)
        {

            return $http({
                method: 'GET',
                url: baseUrls.userServiceBaseUrl + 'Tenant/Company/' + companyId
            }).then(function (resp) {
                return resp.data;
            })
        };


        return {
            getProfileByName: getProfileByName,
            addContactToProfile: addContactToProfile,
            deleteContactFromProfile: deleteContactFromProfile,
            updateProfile: updateProfile,
            getUsers: getUsers,
            addUser: addUser,
            deleteUser: deleteUser,
            addUserGroup: addUserGroup,
            getUserGroups: getUserGroups,
            removeUserFromGroup: removeUserFromGroup,
            getGroupMembers: getGroupMembers,
            addMemberToGroup: addMemberToGroup,
            getMyProfile: getMyProfile,
            updateMyProfile: updateMyProfile,
            getMyRatings: getMyRatings,
            getOrganization: getOrganization,
            getMyOrganization: getMyOrganization

        };
    };


    var module = angular.module("opConsoleApp");
    module.factory("userProfileServices", userProfileApiAccess);

}());
