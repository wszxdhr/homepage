import axios from '../index'

window.handleProfilePage = () => {
  console.log('2123')
}

export default {
  getProfilePage () {
    return axios.get('https://github.com/users/wszxdhr/contributions')
  },
  getProfileInfo () {
    return axios.get('https://api.github.com/users/wszxdhr')
  },
  getRepoInfo (repoUrl) {
    return axios.get(repoUrl)
  }
}
