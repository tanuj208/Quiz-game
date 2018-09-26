
var Profile = (function() {
    var full_name = "";
    var user_id = -1;
  
    var getName = function() {
      return full_name;
    };

    var getId = function() {
      return user_id;
    };
  
    var setName = function(name) {
      full_name = name;
    };

    var setId = function(id) {
      user_id = id;
    };
  
    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId,
    }
  
  })();
  
  export default Profile;