var kpm = 0;
setInterval(function () {
  kpm = 0;
}, 60 * 1000);
module.exports = {
  get: function(){
    return kpm;
  },
  set: function(amount){
    kpm += amount;
  }
};
