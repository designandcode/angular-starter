describe('sneakerTest', function(){
  beforeEach(module('app'));
  var sneaker;
  beforeEach(inject(
    function(sneakerService){
      sneaker = sneakerService;
      sneaker.sneakers = [
        {id: 1, name: 'Yeezy 750 x Kanye West', brand: 'Adidas', series: ['750']},
        {id: 2, name: 'Air Max 90', brand: 'Nike', series: ['Air Max', 'Air Max 90']},
        {id: 3, name: 'Nike Kyrie 1 "All-Star"', brand: 'Nike', series: ['Nike Kyrie 1', 'Nike Kyrie 1']},
        {id: 4, name: 'ZX Flux', brand: 'Adidas', series: ['ZX', 'ZX Flux']},
        {id: 5, name: 'Air Foamposite One', brand: 'Nike', series: ['Air Foamposite', 'Air Foamposite One']},
        {id: 6, name: 'AIR JORDAN 4 RETRO LS', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro']},
        {id: 7, name: 'Air Jordan 1 Retro Low OG "Bred"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 1', 'Air Jordan 1 Low', 'Air Jordan Retro', 'Air Jordan OG']},
        {id: 8, name: 'Air Jordan 4 Retro "Oreo"', brand: 'Jordan', series: ['']},
        {id: 9, name: 'Kobe 9 High EXT QT', brand: 'Nike', series: ['Kobe 9']},
        {id: 10, name: 'Air Jordan 20 "Laser"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 20', 'Air Jordan Laser']},
        {id: 11, name: 'Air Jordan 10 Retro "Lady Liberty"', brand: 'Jordan', series: ['Air Jordan', 'Air Jordan 10', 'Air Jordan Retro']},
        {id: 12, name: '4 retro "Oreo"', brand: 'Air Jordan', series: ['Air Jordan', 'Air Jordan 4', 'Air Jordan Retro', 'Air Jordan Oreo']},
        {id: 13, name: 'BREAKPOINT OX "SOLEBOX"', brand: 'Converse', series: ['']},
        {id: 14, name: 'GEL LYTE V "TAILOR PACK"', brand: 'Asics', series: ['Asics Gel Lyte', 'Asics Gel Lyte V']}
      ]
    }
  ));
  it('should get sneakers', function(){
    expect(sneaker.getSneakers().length).toEqual(14);
    expect(sneaker.getSneakers()[0].id).toEqual(1);
    expect(sneaker.getSneakers()[1].id).toEqual(2);
    expect(sneaker.getSneakers()[2].id).toEqual(3);
    expect(sneaker.getSneakers()[13].id).toEqual(14);
  });
  it('should get sneaker', function(){
    expect(sneaker.getSneaker(1).id).toEqual(1);
    expect(sneaker.getSneaker(2).id).toEqual(2);
    expect(sneaker.getSneaker(3).id).toEqual(3);
    expect(sneaker.getSneaker(14).id).toEqual(14);
  });
  it('should find sneakers', function(){
    var adidas = sneaker.findSneakers('Adidas');
    expect(adidas.length).toEqual(2);
    expect(adidas[0].id).toEqual(1);
    expect(adidas[1].id).toEqual(4);
    var airJordans = sneaker.findSneakers('Air Jordan');
    expect(airJordans.length).toEqual(6);
    expect(airJordans[0].id).toEqual(6);
    expect(airJordans[1].id).toEqual(7);
    expect(airJordans[5].id).toEqual(12);
    expect(sneaker.findSneakers('Air Jordans').length).toEqual(6);
    expect(sneaker.findSneakers('Retro Jordans').length).toEqual(5);
    expect(sneaker.findSneakers('Jordan Retro').length).toEqual(5);
    expect(sneaker.findSneakers('Jordan OG').length).toEqual(1);
  })
});
