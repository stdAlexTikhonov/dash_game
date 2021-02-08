import { Pause } from "../Pause";
import { Scores } from "../Scores";
import { Bombs } from "../Bombs";
import { Time } from "../Time";

export const Dashboard = document.createElement('div');
Dashboard.style.display = 'flex';
Dashboard.style.width = '95%';
Dashboard.style.position = 'absolute';
Dashboard.style.top = 0;
Dashboard.style.left = 0;
Dashboard.style.justifyContent = 'space-between';
Dashboard.style.padding = '10px';

Dashboard.appendChild(Scores);
Dashboard.appendChild(Time);
Dashboard.appendChild(Bombs);
