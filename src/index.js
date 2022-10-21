

var jobStorage = []
// jobStorage.length = 1
var jobCount = 0 

const App = {
    render: function() {
        var html = ''

            for (let id = 0; id <= jobCount; id++) {
                html += `
                <tr id=${id}>
                    <td>
                        <table>
                        <tr>
                            <td>
                                vị trí công việc
                            </td>
                            <td>
                                <input oninput='App.handleInputJobInfo(event, ${id})' name='position' value='${jobStorage[id]?.position || ''}' type="text" class="position">
                            </td>
                        </tr>
        
                        <tr rowspan="2">
                            <td>
                                Thời gian
                            </td>
        
                            <td>
                                <table>
                                    <tr>
                                        <td>Từ ngày</td>
                                        <td>
                                            <input oninput='App.handleInputJobInfo(event, ${id})' name='dateStart' value='${jobStorage[id]?.dateStart}' type="date" class="dateStart">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đến ngày</td>
                                        <td>
                                            <input oninput='App.handleInputJobInfo(event, ${id})'  name='dateEnd' value='${jobStorage[id]?.dateEnd}' type="date" class="dateEnd">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
        
                        <tr>
                            <td>Mô tả công việc</td>
                            <td>
                                <textarea oninput='App.handleInputJobInfo(event, ${id})'  name='description'>${jobStorage[id]?.description || ''}</textarea>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
                    `         
            }

        document.querySelector('.job-list').innerHTML = html
    },
    handleInputJobInfo: function(event, id) {
            

        const input = { [event.target.name]: event.target.value}
        newInfo = {
            ...jobStorage[id],
            ...input
        }
        jobStorage[id] = newInfo

        localStorage.setItem('jobStorage',JSON.stringify(jobStorage))
        // console.log(event.target.name, '', event.target.value, id);
    },
    handleSubmit: function(event) {
        event.preventDefault()
        const name = document.querySelector('#name').value
        const address = document.querySelector('#address').value
        const phone = document.querySelector('#phone').value
        const email = document.querySelector('#email').value
        const job = document.querySelector('#job').value
        const avatar = URL.createObjectURL(document.querySelector('#avatar').files[0])
        const detail = document.querySelector('#detail').value
        
        const info = {
            name: name,
            address: address,
            phone: phone,
            email: email,
            job: job,
            avatar: avatar,
            detail: detail,
            jobList: jobStorage
        }

        localStorage.setItem('info',JSON.stringify(info))
        this.renderPage()
    },
    addJobInput: function(){
        jobCount++ 
        this.render()
    },   
   renderPage: function() {
   const info = JSON.parse(localStorage.getItem('info'))
       const htmls = `
       <div>
            <div>
                <img src='${info.avatar}'>
                <h1>${info.name}</h1>
                <p>${info.job}</p>
                <p>${info.address}</p>
                <p>${info.email}</p>
                <p>${info.phone}</p>
            </div>
            <div>
                <h1>
                    Kinh nghiệm làm việc
                </h1>
                ${info.jobList.map(job => {
                    return `
                      <div>
                            <h2>${job.position}</h2>
                            <div>${job.dateStart}</div>
                            <div>${job.dateEnd}</div>
                            <div>${job.description}</div>
                      </div>
                    `
                })}
            </div>

       </div>
   `
       document.open()
       document.write(htmls)
   },
   loadBooks: function() {
       // check valid localStorage (cause it will return null when local not contain any data and it will error to use map function for jobStorage)
       const getBooks = JSON.parse(localStorage.getItem('books'))

       // lưu dữ liệu từ localStorage về cái mảng để render
       if(getBooks){
           bookStorage = getBooks
       }
   },

   start: async function(){
    //    this.loadBooks()
    // this.handleEvent()
       this.render()
   }
}

App.start()



