function getMovieList (url, success) {
  wx.request({
    url: url,
    success: function(res) {
      success(formatData(res.data.subjects))
    }
  })
}
function formatData (data) {
  return data.map(item => {
    return {
      coverImg: item.images.large,
      title: item.original_title,
      score: item.rating.average,
      stars: coverStarToArray(item.rating.stars)
    }
  })
}
function coverStarToArray (stars) {
  // 35
  // ['1', '1', '1', '0', '0']
  let arr = []
  let num = parseInt(stars.substring(0, 1)) 
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      arr.push('1')
    } else {
      arr.push('0')
    }
  }
  return arr
}
module.exports = {
  getMovieList: getMovieList
}
