import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsServiceService {
  constructor(private firestore: Firestore) {}

  getComments(productId: number): Observable<any[]> {
    const commentsRef = collection(this.firestore, 'comments');
    const q = query(commentsRef, where('productId', '==', productId));
    return from(getDocs(q).then((querySnapshot) => {
      const comments = querySnapshot.docs.map(doc => doc.data());
      return comments;
    }));
  }

  addComment(productId: number, comment: string, userName: string, newRating:number ): Promise<any> {
    const commentData = {
      productId,
      comment,
      userName,
      rating: newRating,
      timestamp: new Date(),
    };
    return addDoc(collection(this.firestore, 'comments'), commentData);
  }
}
