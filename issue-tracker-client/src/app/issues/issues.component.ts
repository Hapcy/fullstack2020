import { Component, OnInit } from '@angular/core';
import { Issue } from '../core/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: Issue[] = [{
    title: 'Issue1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra imperdiet ex vitae iaculis. Donec scelerisque porta tincidunt. Morbi consequat enim ornare sapien scelerisque ultricies vel sit amet dolor. Duis vitae neque id mi blandit tincidunt suscipit eu orci. Curabitur aliquam elit justo, ut sagittis ipsum sollicitudin a. Curabitur accumsan, augue a tincidunt malesuada, nibh massa vehicula diam, quis porta metus odio vel mi.',
  }, {
    title: 'Issue2',
    description: 'leiras',
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
