import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OutfitService } from '../outfit.service';
import { selectOutfits } from '../../store/outfits/outfits.selector';
import { selectClosetId } from '../../store/closet/closet.selector';

@Component({
  selector: 'app-outfits',
  templateUrl: './outfits.component.html',
  styleUrls: ['./outfits.component.css']
})
export class OutfitsComponent {

  
  constructor(private store: Store,
    private outfitService: OutfitService){}
    
  
    outfits$ = this.store.select(selectOutfits);
    closetId$ = this.store.select(selectClosetId);
    
}
