import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { getFirestore } from 'firebase/firestore/lite'
@Injectable({
  providedIn: 'root',
})
export class CommentsServiceService {
  constructor(private firestore: Firestore) {}

  // Получить комментарии для товара
  getComments(productId: number): Observable<any[]> {
    const commentsRef = collection(this.firestore, 'comments'); // Здесь создаем ссылку на коллекцию
    const q = query(commentsRef, where('productId', '==', productId));
    return from(getDocs(q).then((querySnapshot) => {
      const comments = querySnapshot.docs.map(doc => doc.data());
      return comments;
    }));
  }

  // Добавить новый комментарий
  addComment(productId: number, comment: string, userName: string): Promise<any> {
    const commentData = {
      productId,
      comment,
      userName,
      timestamp: new Date(),
    };
    return addDoc(collection(this.firestore, 'comments'), commentData); // Добавляем новый комментарий в коллекцию
  }
}
