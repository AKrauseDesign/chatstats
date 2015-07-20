var kpm = 0;
setInterval(function () {
  KPM = 0;
}, 60 * 1000);
module.exports = {
  get: function(){
    return kpm;
  },
  set: function(amount){
    kpm += amount;
  }
};
