var animationWelcome = (function(){
    var sqrAnimation = document.getElementById('squares');
    var svgContainer = sqrAnimation.getElementsByTagName('svg')[0];

    var screenRatio = getScreenRatio();
    console.log(screenRatio);
    //var squaresPerColAmount = svgContainer.clientHeight / squareSide;
    var squaresPerRowAmount = screenRatio.width;
    var squaresPerColAmount = screenRatio.height;
    

    var squareSide = calcSquareSide(svgContainer);
    console.log('squaresPerRowAmount : ' + squaresPerRowAmount)
    console.log('squaresPerColAmount : ' + squaresPerColAmount)
    console.log(svgContainer);
  
   



    var singleSquare = {
        width : window.innerWidth / squaresPerRowAmount,
        height : window.innerHeight / squaresPerColAmount
    }


    for(var row= 0; row < squaresPerColAmount; row ++){
      for(var col = 0; col < squaresPerRowAmount; col++){
        var rectangle = getRectangle(singleSquare.width,singleSquare.height);
        setRectanglePosition(rectangle, row, col);

        attachEventsToRectangle(rectangle)

        svgContainer.appendChild(rectangle);
      }
    }

    function calcSquareSide(svg) {

      //var side = svg.clientWidth / squaresPerRowAmount;
      console.log('window.innerWidth : ' + window.innerWidth);
      console.log('window.innerHeight : ' + window.innerHeight);
      //var side = svg.clientWidth / squaresPerRowAmount;
      var side = window.innerWidth / squaresPerRowAmount;
      console.log(parseInt(side))
      return parseInt(side);
    }

    function getRectangleNotWorking(width, height) {
      var rectNode = document.createElement("rect");
      rectNode.setAttribute("width", width);
      rectNode.setAttribute("height", height);
      rectNode.setAttribute("style", "fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)");

      return rectNode;
    }


    function getRectangle(width,height){
      var rectNodeSvg = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); //Create a path in SVG's namespace
      //rectNodeSvg.setAttribute("d","M 0 0 L 10 10"); //Set path's data
      rectNodeSvg.setAttribute("width", width);
      rectNodeSvg.setAttribute("height", height);
      //rectNodeSvg.style.stroke = "#000"; //Set stroke colour
      rectNodeSvg.style.strokeWidth = "1px"; //Set stroke width
      /* rectNodeSvg.style.fill = "white"; //Set stroke colour */
      //svg.appendChild(rectNodeSvg);
      var delay = (Math.random()* (3 - 1) + 1);

      rectNodeSvg.setAttribute("style", "animation-delay : " + delay +'s');

      return rectNodeSvg;
    }

    function setRectanglePosition(rectangle,row,column){
      var rectangleX = col * rectangle.getAttribute('width');
      var rectangleY = row * rectangle.getAttribute('height');

      rectangle.setAttribute("x", rectangleX);
      rectangle.setAttribute("y", rectangleY);
    }

    function attachEventsToRectangle(rectangle){

        var releasedDelay = (Math.random()* (10 - 1) + 1) * 1000;
        setReleased(rectangle,releasedDelay);

        rectangle.addEventListener('mouseover',function(){
            console.log('mouseover');
          if(this.getAttribute("class") === ""){
            this.setAttribute("class", "active");
          }
          setReleased(this);
        });

        rectangle.addEventListener('mouseout',function(){

          console.log('got it');
          console.log(this.className)
          this.setAttribute("style", "");
          //this.className="active";
          this.setAttribute("class", "released");
          setReleased(this);
        });


    }

    function setReleased(element,delay){
          var timeout =  delay || 500;
          var delayed = setTimeout(function(){
            element.setAttribute("style", "");
            //this.className="active";
            element.setAttribute("class", "released");
            clearTimeout(delayed);
          },timeout);

    }



    function getScreenRatio (){
    /*
    var w = screen.width;
    var h = screen.height;
    var r = gcd (w, h);
    console.log('r : ' + r);

    var aspectWidth     = w/r;
    var aspectHeight     = h/r;

    console.log('aspectWidth : ' + aspectWidth);
    console.log('aspectHeight : ' + aspectHeight);
    */

      var aspectWidth = 12;
      var aspectHeight = 8;
      var result = {
        width: aspectWidth,
        height: aspectHeight,
      }
        if(screen.width < screen.height){
          result = {
            width: aspectHeight,
            height: aspectWidth
          }
        }
      return result;

    }

    function gcd (a, b) {
      console.log('a : ' + a + ', b : ' + b);
        return (b == 0) ? a : gcd (b, a%b);
    }

  })();