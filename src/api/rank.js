import axios from 'axios'
export default {
  list: () => axios.get(`${process.env.VUE_APP_RANK_API_BASE}/ranking`),
  summonerlist: () => axios.get(`${process.env.VUE_APP_RANK_API_BASE}/summoner`)
}