import { REVENUE_COLOR_MAP } from "../constants";

export const convertDisplayData = (data) => {
  const res = JSON.parse(JSON.stringify(data))
  res.features.forEach(el => {
    el.properties.id = el.properties.area_id
  });
  return res
}

export const getNumberOfUser = (areas, users) => {
  const userCountByArea = {};
  const res = JSON.parse(JSON.stringify(areas))
  users.forEach(user => {
    if (userCountByArea[user.area_id]) {
      userCountByArea[user.area_id].totalUser += 1
      userCountByArea[user.area_id].proUsers += user.is_pro_user ? 1 : 0
      if (user.gender === 'M') {
        userCountByArea[user.area_id].male += 1
      } else {
        userCountByArea[user.area_id].female += 1
      }
    } else {
      userCountByArea[user.area_id] = {
        totalUser: 1,
        male: user.gender === 'M' ? 1 : 0,
        female: user.gender === 'F' ? 1 : 0,
        proUsers: user.is_pro_user ? 1 : 0
      }
    }
  })

  res.features.forEach(el => {
    const counts = userCountByArea[el.properties.area_id]
    const proUsers = ((counts.proUsers / counts.totalUser) * 100).toFixed(2)
    const revenue = proUsers > 50 ? 'high' : proUsers >= 40 ? 'medium' : 'low'
    el.properties = {
      ...el.properties,
      'Total Users': counts.totalUser,
      'Male ratio': `${((counts.male / counts.totalUser) * 100).toFixed(2)}%`,
      'Female ratio': `${((counts.female / counts.totalUser) * 100).toFixed(2)}%`,
      'Pro Users': `${proUsers}%`,
      color: REVENUE_COLOR_MAP[revenue]
    }
    el.properties.fillColor = getRandomColor()
  });

  return res
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
