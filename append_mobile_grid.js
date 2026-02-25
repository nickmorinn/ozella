const fs = require('fs');

const cssOverrides = `
/* --- OZELLA MOBILE COLLECTION GRID --- */
@media only screen and (max-width: 768px) {
  .template-collection .collection-grid__wrapper .grid.grid--uniform {
    margin-left: -17px !important;
    margin-right: -17px !important;
  }
  
  .template-collection .collection-grid__wrapper .grid__item:nth-child(odd) {
    padding-left: 0 !important;
    padding-right: 4px !important; /* Half of 8px gap */
  }
  
  .template-collection .collection-grid__wrapper .grid__item:nth-child(even) {
    padding-left: 4px !important; /* Half of 8px gap */
    padding-right: 0 !important;
  }
}
`;

fs.appendFileSync('assets/theme.css.liquid', cssOverrides);
fs.appendFileSync('assets/theme.css', cssOverrides);
console.log('Mobile collection grid overrides applied.');