import { http } from '@/api/httpAxios'
/*import createURLParams from '@/api/datasource/createURLParams.ts'*/

export default class StatisticAPI {
  public static getUserStatistic(idOrde: string) {
    return http.get(`/orders/${idOrde}/user_statistics`)
  }
  public static geAnswerStatistic(idOrde: string) {
    return http.get(`/orders/${idOrde}/statistics`)
  }
}
