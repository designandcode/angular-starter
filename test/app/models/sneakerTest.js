describe('sneakerTest', function(){
  beforeEach(module('app'));
  var sneaker;
  beforeEach(inject(
    function(sneakerService){
      sneaker = sneakerService;
      sneaker.sneakers = [
        {name: 'Yeezy 750 x Kanye West', brand: 'Adidas', series: ['750']},
        {name: 'Air Max 90', brand: 'Nike', series: ['Air Max', 'Air Max 90']},
        {name: 'Nike Kyrie 1 "All-Star"', brand: 'Nike', series: ['Nike Kyrie 1', 'Nike Kyrie 1']},
        {name: 'ZX Flux', brand: 'Adidas', series: ['ZX', 'ZX Flux']},
        {name: 'Air Foamposite One', brand: 'Nike', series: ['Air Foamposite', 'Air Foamposite One']},
        {name: 'AIR JORDAN 4 RETRO LS', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro']},
        {name: 'Air Jordan 1 Retro Low OG "Bred"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 1', 'Air Jordan 1 Low', 'Air Jordan Retro', 'Air Jordan OG']},
        {name: 'Air Jordan 4 Retro "Oreo"', brand: 'Jordan', series: ['']},
        {name: 'Kobe 9 High EXT QT', brand: 'Nike', series: ['Kobe 9']},
        {name: 'Air Jordan 20 "Laser"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 20', 'Air Jordan Laser']},
        {name: 'Air Jordan 10 Retro "Lady Liberty"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 10', 'Air Jordan Retro']},
        {name: '4 retro "Oreo"', brand: 'Air Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro', 'Air Jordan Oreo']},
        {name: 'BREAKPOINT OX "SOLEBOX"', brand: 'Converse', series: ['']},
        {name: 'GEL LYTE V "TAILOR PACK"', brand: 'Asics', series: ['Asics Gel Lyte', 'Asics Gel Lyte V']}
      ]
    }
  ));
  it('should find sneakers', function(){
    var adidas = sneaker.findSneakers('Adidas');
    expect(adidas.length).toEqual(2);
    var airJordans = sneaker.findSneakers('Air Jordan');
    expect(airJordans.length).toEqual(6);
    expect(sneaker.findSneakers('Air Jordans').length).toEqual(6);
    expect(sneaker.findSneakers('Retro Jordans').length).toEqual(5);
    expect(sneaker.findSneakers('Jordan Retro').length).toEqual(5);
    expect(sneaker.findSneakers('Jordan OG').length).toEqual(1);
  })
});
