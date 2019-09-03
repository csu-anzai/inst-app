import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import _ from 'lodash';
import db from './db';

const url = 'https://www.instagram.com';

const tableBody = document.getElementById('tableBody');
const btn = document.getElementById('btn');

const getUserInfo = async (username, index) => {
  await axios.get(`${url}/${username}/?__a=1`).then(({ data }) => {
    const { edge_followed_by, id } = data.graphql.user;
    const { count: followersCount } = edge_followed_by;
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    const td1 = document.createElement('td');
    td1.innerHTML = username;
    const td2 = document.createElement('td');
    td2.innerHTML = id;
    const td3 = document.createElement('td');
    td3.innerHTML = followersCount;
    th.innerHTML = index;

    tr.append(th, td1, td2, td3);
    tableBody.append(tr);
  });
};

class Balancer {
  constructor(kwArr, timeout) {
    this._i = 0;

    this._kwArr = kwArr;
    this._tikTimeout = timeout;

    this.start();
  }

  start() {
    this._instance = setInterval(() => {
      this._tik();
    }, this._tikTimeout);
  }

  stop() {
    clearInterval(this._instance);
  }

  _tik() {
    if (this._i < this._kwArr.length) {
      var kw = this._kwArr[this._i++];
      getUserInfo(kw, this._i);
    } else {
      this.stop();
    }
  }
}

const app = () => {
  btn.addEventListener('click', () => {
    console.log('c');
    const balance = new Balancer(db, 700);
    balance.start();
  });
};

app();
