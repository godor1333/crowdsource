import { http } from '@/api/httpAxios'
import { saveAs } from 'file-saver'
import { arrayBufferToBlob } from 'blob-util'

export default class AdminAPI {
  public static importBD(file: any) {
    const data = new FormData()
    data.append('file', file)
    return http.post('/admin/import', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  public static async exportBD() {
    const response = await http.get('/admin/export', {
      responseType: 'arraybuffer'
    })
    saveAs(arrayBufferToBlob(response.data), `dump.json`)
  }
}
