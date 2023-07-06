import moment from 'moment';

const Localtime =(date) => {
    const local = moment(date).local().format("YYYY-MM-DDTHH:mm:ss").substring(0, 10);
    return local;
}


export default Localtime;