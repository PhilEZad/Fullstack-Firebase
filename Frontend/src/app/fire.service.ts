import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

import * as config from '../../firebaseconfig.js'
@Injectable({
  providedIn: 'root'
})
export class FireService {

  firebaseApplication;
  firestore: firebase.firestore.Firestore;
  messages: any[] = [];
  constructor() {
    this.firebaseApplication = firebase.initializeApp(config.firebaseconfig)
    this.firestore = firebase.firestore();
    this.getMessages();
  }

  sendMessage(sendThisMessage: any) {
    let messageDTO: MessageDTO = {
      messageContent: sendThisMessage,
      timeStamp: new Date(),
      user: 'some random user'
    }
    this.firestore.collection('myChat')
      .add(messageDTO)
  }

  getMessages() : void
  {
    this.firestore
      .collection('myChat')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added")
          {
            this.messages.push(change.doc.data())
          }
        })
      })

  }
}

export interface MessageDTO
{
  messageContent: string;
  timeStamp: Date;
  user: string;
}
