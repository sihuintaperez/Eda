class Point {
	constructor (x, y, userData )
	{
		this.x = x;
		this.y = y;
		this.userData = userData ;
	}
}
class Rectangle 
{
	constructor (x, y, w, h)
	{
		this.x = x; // center
		this.y = y;
		this.w = w; // half width
		this.h = h; // half height
	}
	// verifica si este objeto contiene un objeto Punto
	contains (point)
	{
		if(point.x<=this.x+this.w &&point.x>=this.x-this.w &&point.y<=this.y+this.h &&point.y>=this.y-this.h)
			{return true;}
		else
			{return false;}
	}
	// verifica si este objeto se intersecta con otro objeto Rectangle
	intersects ( range )
	{
		if(this.y + this.h > range.y - range.h || this.y - this.h < range.y + range.h || 
		 this.x + this.w > range.x - range.w ||this.x - this.w < range.x + range.w)
			{return true;}
		else
			{return false;}
	}
}

class QuadTree
{
	constructor ( boundary , n)
	{
		this.boundary = boundary ; // Rectangle
		this.capacity = n; // capacidad maxima de cada cuadrante
		this.points = []; // vector , almacena los puntos a almacenar
		this.divided = false ;
	}
	// divide el quadtree en 4 quadtrees
	subdivide() 
	{	
		var x = this.boundary.x;
		var y = this.boundary.y;
		var w = this.boundary.w;
		var h = this.boundary.h;

		var northeastRect = new Rectangle(x+w/2, y-h/2, w/2, h/2);
		var northwestRect = new Rectangle(x-w/2, y-h/2, w/2, h/2);
		var southeastRect = new Rectangle(x+w/2, y+h/2, w/2, h/2);
		var southwestRect = new Rectangle(x-w/2, y+h/2, w/2, h/2);
		
		this.northeast = new QuadTree(northeastRect, this.capacity);
		this.northwest = new QuadTree(northwestRect, this.capacity);
		this.southeast = new QuadTree(southeastRect, this.capacity);
		this.southwest = new QuadTree(southwestRect, this.capacity);
		
		this.divided = true;
		console.log("Division");
	}
	insert(point)
	{
		if(this.boundary.contains(point)==false)
			return;
		
		if(this.points.length < this.capacity)
		{
			this.points.push(point);
		}
		else
		{
			if(this.divided == false)
				this.subdivide();

			this.northeast.insert(point);
			this.northwest.insert(point);
			this.southeast.insert(point);
			this.southwest.insert(point);
			
		}

	}
	show () 
	{
		stroke(255);
		strokeWeight(1);
		noFill();
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w*2 , this.boundary.h*2);
		if(this.divided)
		{
			this.northeast.show () ;
			this.northwest.show () ;
			this.southeast.show () ;
			this.southwest.show () ;
		}
		for (let p of this.points)
		{
			strokeWeight (4) ;
			point (p.x, p.y);
		}
	}
}