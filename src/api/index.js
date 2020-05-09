import axios from 'axios'
import github from './list/github'
import interceptorHandler from './interceptor'

export default interceptorHandler(axios)

export const apiList = {
  github
}
