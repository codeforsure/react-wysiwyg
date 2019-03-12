class UploadAdapter {
    constructor( loader ) {
      this.loader = loader;
    }
    upload() {
        const data = new FormData();
        data.set('UPLOADCARE_PUB_KEY', 'b0413732680291f6a6ae')
        data.set('UPLOADCARE_STORE', '1')
        data.append('typeOption', 'upload_image');
        data.append('file', this.loader.file);
        return new Promise((resolve, reject) => {
            fetch('https://upload.uploadcare.com/base/', {
                method: 'POST',
                body: data
            }).then(res =>
              res.json()
            ).then(res => {
              console.log(res.file);
              var resData = res;
              resData.default = 'https://ucarecdn.com/'+res.file+'/';

              console.log(resData);
              resolve(resData);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
}
