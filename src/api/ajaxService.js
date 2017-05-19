import { Observable } from 'rxjs/Observable';

class AjaxService {

    get(url) {
        return this.request({ url: url });
    }

    request(options) {
        return Observable.ajax(options).do(
            res => { },
            err => {
                // Decorate AjaxError object
                let xhr = err.xhr;
                err.detailedStatus = `${xhr.status} ${xhr.statusText}`;
                err.response = xhr.response;
            }
        );
    }

}

const ajaxService = new AjaxService();

export { 
    AjaxService,
    ajaxService
};