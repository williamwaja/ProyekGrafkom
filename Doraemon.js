function generateSphere(x, y, z, c1, c2, c3, radius, segments) {
    var vertices = [];
    var colors = [];

    var ball_color = [
        [c1,c2,c3]
    ];
  
    for (var i = 0; i <= segments; i++) {
        var latAngle = Math.PI * (-0.5 + (i / segments));
        var sinLat = Math.sin(latAngle);
        var cosLat = Math.cos(latAngle);
  
        for (var j = 0; j <= segments; j++) {
            var lonAngle = 2 * Math.PI * (j / segments);
            var sinLon = Math.sin(lonAngle);
            var cosLon = Math.cos(lonAngle);
  
            var xCoord = cosLon * cosLat;
            var yCoord = sinLon * cosLat;
            var zCoord = sinLat;
  
            var vertexX = x + radius * xCoord;
            var vertexY = y + radius * yCoord;
            var vertexZ = z + radius * zCoord;
  
            vertices.push(vertexX, vertexY, vertexZ -0.5);
  
            var colorIndex = j % ball_color.length;
            colors = colors.concat(ball_color[colorIndex]);
        }
    }
  
    var ball_faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
  
            ball_faces.push(index, nextIndex, index + 1);
            ball_faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: ball_faces };
  }


  function generateDoraemonFoot(x, y, z, c1, c2, c3, radius, segments, oblateness, widthFactor) {
    var vertices = [];
    var colors = [];

    var ball_color = [
        [c1,c2,c3]
    ];
  
    for (var i = 0; i <= segments; i++) {
        var latAngle = Math.PI * (-0.5 + (i / segments));
        var sinLat = Math.sin(latAngle);
        var cosLat = Math.cos(latAngle);
  
        for (var j = 0; j <= segments; j++) {
            var lonAngle = 2 * Math.PI * (j / segments);
            var sinLon = Math.sin(lonAngle);
            var cosLon = Math.cos(lonAngle);
  
            var xCoord = cosLon * cosLat * widthFactor; // Apply width factor
            var yCoord = sinLon * cosLat;
            var zCoord = sinLat;
  
            var vertexX = x + radius * xCoord;
            var vertexY = y + radius * yCoord;
            var vertexZ = z + radius * zCoord * oblateness; // Apply oblateness
  
            vertices.push(vertexX, vertexY, vertexZ -0.5);
  
            var colorIndex = j % ball_color.length;
            colors = colors.concat(ball_color[colorIndex]);
        }
    }
  
    var ball_faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
  
            ball_faces.push(index, nextIndex, index + 1);
            ball_faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: ball_faces };
}

function generateEllipsoid(x, y, z, c1, c2, c3, radiusX, radiusY, radiusZ, segments) {
  var vertices = [];
  var colors = [];

  var ball_color = [
      [c1,c2,c3]
  ];

  for (var i = 0; i <= segments; i++) {
      var latAngle = Math.PI * (-0.5 + (i / segments));
      var sinLat = Math.sin(latAngle);
      var cosLat = Math.cos(latAngle);

      for (var j = 0; j <= segments; j++) {
          var lonAngle = 2 * Math.PI * (j / segments);
          var sinLon = Math.sin(lonAngle);
          var cosLon = Math.cos(lonAngle);

          var xCoord = cosLon * cosLat;
          var yCoord = sinLon * cosLat;
          var zCoord = sinLat;

          var vertexX = x + radiusX * xCoord;
          var vertexY = y + radiusY * yCoord;
          var vertexZ = z + radiusZ * zCoord;

          vertices.push(vertexX, vertexY, vertexZ);

          var colorIndex = j % ball_color.length;
          colors = colors.concat(ball_color[colorIndex]);
      }
  }

  var ball_faces = [];
  for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
          var index = i * (segments + 1) + j;
          var nextIndex = index + segments + 1;

          ball_faces.push(index, nextIndex, index + 1);
          ball_faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }

  return { vertices: vertices, colors: colors, faces: ball_faces };
}

  function generateTube(x, y, z, c1, c2, c3, height, bottomRadius, topRadius, segments) {
    var angle_increment = (2 * Math.PI) / segments;
    var vertices = [];
    var colors = [];
    var faces = [];
  
    for (var i = 0; i < segments; i++) {
        var angle1 = i * angle_increment;
        var angle2 = (i + 1) * angle_increment;
  
        // Bottom vertices
        vertices.push(x + bottomRadius * Math.cos(angle1), y, z + bottomRadius * Math.sin(angle1));
        vertices.push(x + bottomRadius * Math.cos(angle2), y, z + bottomRadius * Math.sin(angle2));
  
        // Top vertices
        vertices.push(x + topRadius * Math.cos(angle1), y + height, z + topRadius * Math.sin(angle1));
        vertices.push(x + topRadius * Math.cos(angle2), y + height, z + topRadius * Math.sin(angle2));
  
        // Colors for all vertices
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
  
        // Faces for this segment
        var baseIndex = i * 4;
        faces.push(baseIndex, baseIndex + 1, baseIndex + 2); // Triangle 1
        faces.push(baseIndex + 1, baseIndex + 3, baseIndex + 2); // Triangle 2
    }
  
    // Closing faces for top and bottom circles
    for (var i = 0; i < segments - 1; i++) {
        // Bottom circle
        faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
        // Top circle
        faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
    }
  
    // Close the last segment with the first one
    faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
    faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);
  
    return { vertices: vertices, colors: colors, faces: faces };
  }
  
  function generateEllipticParaboloid(x,y,z,c1,c2,c3,a, b, segments) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;
  
      for (var j = 0; j <= segments; j++) {
        var v = (2 * j) / segments;
  
        var xCoord = x+ a * v * Math.cos(u);
        var yCoord = y+ b * v * Math.sin(u);
        var zCoord = z+ Math.pow(v, 2);
  
        vertices.push(xCoord, yCoord, zCoord);
  
        colors.push(c1, c2, c3);
      }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
        var index = i * (segments + 1) + j;
        var nextIndex = index + segments + 1;
  
        faces.push(index, nextIndex, index + 1);
        faces.push(nextIndex, nextIndex + 1, index + 1);
      }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
  }
  function generateReverseEllipticParaboloid(x,y,z,c1,c2,c3,a, b, segments) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;
  
      for (var j = 0; j <= segments; j++) {
        var v = (2 * j) / segments;
  
        var xCoord = x + a * v * Math.cos(u);
        var yCoord = y + b * v * Math.sin(u);
        var zCoord = z - Math.pow(v, 2); // Ubah tanda dari koordinat z
  
        vertices.push(xCoord, yCoord, zCoord);
  
        colors.push(c1, c2, c3);
      }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
        var index = i * (segments + 1) + j;
        var nextIndex = index + segments + 1;
  
        faces.push(index, nextIndex, index + 1);
        faces.push(nextIndex, nextIndex + 1, index + 1);
      }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
}
function generateBentCuboid(x, y, z, c1, c2, c3, width, height, depth, bend, segments) {
  var vertices = [];
  var colors = [];
  var cuboid_color = [[c1, c2, c3]];

  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var halfDepth = depth / 2;

  for (var i = 0; i <= segments; i++) {
      var segmentRatio = i / segments;
      var bendAngle = bend * Math.PI * segmentRatio;
      var sinBend = Math.sin(bendAngle);
      var cosBend = Math.cos(bendAngle);

      for (var j = 0; j <= segments; j++) {
          var depthRatio = j / segments;

          var xCoord = x + (halfWidth - segmentRatio * width);
          var yCoord = y + (cosBend * (halfHeight - depthRatio * height));
          var zCoord = z + (sinBend * (halfDepth - depthRatio * depth));

          vertices.push(xCoord, yCoord, zCoord);

          var colorIndex = j % cuboid_color.length;
          colors = colors.concat(cuboid_color[colorIndex]);
      }
  }

  var faces = [];
  for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
          var index = i * (segments + 1) + j;
          var nextIndex = index + segments + 1;

          faces.push(index, nextIndex, index + 1);
          faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}

function generateTorus(x, y, z, c1, c2, c3, radius, tubeRadius, radialSegments, tubularSegments) {
  var vertices = [];
  var colors = [];

  var torus_color = [c1, c2, c3];

  for (var j = 0; j <= radialSegments; j++) {
      for (var i = 0; i <= tubularSegments; i++) {
          var u = i / tubularSegments * Math.PI * 2;
          var v = j / radialSegments * Math.PI * 2;

          var xCoord = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
          var yCoord = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
          var zCoord = tubeRadius * Math.sin(v);

          vertices.push(x + xCoord, y + yCoord, z + zCoord);
          colors = colors.concat(torus_color);
      }
  }

  var faces = [];
  for (var j = 1; j <= radialSegments; j++) {
      for (var i = 1; i <= tubularSegments; i++) {
          var index = (tubularSegments + 1) * j + i - 1;
          var index1 = (tubularSegments + 1) * (j - 1) + i - 1;
          var index2 = (tubularSegments + 1) * (j - 1) + i;
          var index3 = (tubularSegments + 1) * j + i;

          faces.push(index, index1, index2);
          faces.push(index, index2, index3);
      }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}
function generateTorusKalung(x, y, z, c1, c2, c3, radius, tubeRadius, radialSegments, tubularSegments) {
  var vertices = [];
  var colors = [];

  var torus_color = [c1, c2, c3];

  for (var j = 0; j <= radialSegments; j++) {
      for (var i = 0; i <= tubularSegments; i++) {
          var u = i / tubularSegments * Math.PI * 2;
          var v = j / radialSegments * Math.PI * 2;

          var xCoord = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
          var yCoord = tubeRadius * Math.sin(v);
          var zCoord = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);

          vertices.push(x + xCoord, y + yCoord, z + zCoord);
          colors = colors.concat(torus_color);
      }
  }

  var faces = [];
  for (var j = 1; j <= radialSegments; j++) {
      for (var i = 1; i <= tubularSegments; i++) {
          var index = (tubularSegments + 1) * j + i - 1;
          var index1 = (tubularSegments + 1) * (j - 1) + i - 1;
          var index2 = (tubularSegments + 1) * (j - 1) + i;
          var index3 = (tubularSegments + 1) * j + i;

          faces.push(index, index1, index2);
          faces.push(index, index2, index3);
      }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}
function generateCurve(x, y, z, c1, c2, c3, radius, curvature, segments) {
  var vertices = [];
  var colors = [];
  var faces = [];
  var curve_color = [c1, c2, c3];

  for (var i = 0; i <= segments; i++) {
    var angle = i * (Math.PI * 2) / segments;
    var curvedX = x + radius * Math.cos(angle);
    var curvedY = y + radius * Math.sin(angle) * curvature;
    var curvedZ = z;

    vertices.push(curvedX, curvedY, curvedZ);
    colors.push(c1, c2, c3);
  }

  for (var i = 1; i < segments - 1; i++) {
    faces.push(0, i, i + 1);
  }

  return { vertices: vertices, colors: colors, faces: faces };
}
function generateEllipse(x, y, z, c1, c2, c3, radiusX, radiusY, radiusZ, segments) {
  var vertices = [];
  var colors = [];
  var faces = [];
  var ellipse_color = [c1, c2, c3];

  for (var i = 0; i <= segments; i++) {
    var latAngle = Math.PI * (-0.5 + (i / segments));
    var sinLat = Math.sin(latAngle);
    var cosLat = Math.cos(latAngle);

    for (var j = 0; j <= segments; j++) {
      var lonAngle = 2 * Math.PI * (j / segments);
      var sinLon = Math.sin(lonAngle);
      var cosLon = Math.cos(lonAngle);

      var xCoord = cosLon * cosLat;
      var yCoord = sinLon * cosLat;
      var zCoord = sinLat;

      var vertexX = x + radiusX * xCoord;
      var vertexY = y + radiusY * yCoord;
      var vertexZ = z + radiusZ * zCoord;

      vertices.push(vertexX, vertexY, vertexZ);
      colors.push(c1, c2, c3);
    }
  }

  for (var i = 0; i < segments; i++) {
    for (var j = 0; j < segments; j++) {
      var index = i * (segments + 1) + j;
      var nextIndex = index + segments + 1;

      faces.push(index, nextIndex, index + 1);
      faces.push(nextIndex, nextIndex + 1, index + 1);
    }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}

  function main() {
    function generateBSpline(controlPoint, m, degree) {
      var curves = [];
      var knotVector = []

      var n = controlPoint.length / 5;


      // Calculate the knot values based on the degree and number of control points
      for (var i = 0; i < n + degree + 1; i++) {
          if (i < degree + 1) {
              knotVector.push(0);
          } else if (i >= n) {
              knotVector.push(n - degree);
          } else {
              knotVector.push(i - degree);
          }
      }



      var basisFunc = function (i, j, t) {
          if (j == 0) {
              if (knotVector[i] <= t && t < (knotVector[(i + 1)])) {
                  return 1;
              } else {
                  return 0;
              }
          }

          var den1 = knotVector[i + j] - knotVector[i];
          var den2 = knotVector[i + j + 1] - knotVector[i + 1];

          var term1 = 0;
          var term2 = 0;


          if (den1 != 0 && !isNaN(den1)) {
              term1 = ((t - knotVector[i]) / den1) * basisFunc(i, j - 1, t);
          }

          if (den2 != 0 && !isNaN(den2)) {
              term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i + 1, j - 1, t);
          }

          return term1 + term2;
      }


      for (var t = 0; t < m; t++) {
          var x = 0;
          var y = 0;

          var u = (t / m * (knotVector[controlPoint.length / 5] - knotVector[degree])) + knotVector[degree];

          //C(t)
          for (var key = 0; key < n; key++) {

              var C = basisFunc(key, degree, u);
              x += (controlPoint[key * 5] * C);
              y += (controlPoint[key * 5 + 1] * C);
          }
          curves.push(x);
          curves.push(y);
          curves.push(0);
          curves.push(0);
          curves.push(0);

      }
      return curves;
  }

  function normalizeX(x) {
      return ((x/CANVAS.width)*2)-1;
  }
  function normalizeY(y) {
      return -1*(((y/CANVAS.height)*2)-1);
  }

    var CANVAS = document.getElementById("myCanvas");
  
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
  
    var GL;
    try {
      GL = CANVAS.getContext("webgl", { antialias: true });
      var EXT = GL.getExtension("OES_element_index_uint");
    } catch (e) {
      alert("WebGL context cannot be initialized");
      return false;
    }
  
    var drag = false;
    var x_prev, y_prev;
    var dX = 0,
      dY = 0;
    var THETA = 0,
      PHI = 0;
    var AMORTIZATION = 0.95; //gaya gesek
    var mouseDown = function (e) {
      drag = true;
      x_prev = e.pageX;
      y_prev = e.pageY;
      e.preventDefault(); //mencegah fungsi awal dri tombol yg di klik, misal klik kanan biasa keluarin inspect dkk tpi itu bisa dibatesi
      return false;
    };
  
    var mouseUp = function (e) {
      drag = false;
    };
  
    var mouseMove = function (e) {
      drag = false;
      // if (!drag) return false;
      // dX = ((e.pageX - x_prev) * 2 * Math.PI) / CANVAS.width;
      // dY = ((e.pageY - y_prev) * 2 * Math.PI) / CANVAS.height;
      // THETA += dX;
      // PHI += dY;
      // x_prev = e.pageX;
      // y_prev = e.pageY;
      // e.preventDefault();
    };

     // Scaling
     var SCALE = 1.0;
     var SCALE_SPEED = 0.1;

     var keys = {
      up: false,
      down: false,
      left: false,
      right: false
  };


    var translateX=0;
    var translateY=0;
    var translateZ=0;
    var targetX = translateX;
    var targetY = translateY;
    var keydown = function (e){
      if (e.key == 'w' || e.key == 'W') {
        SCALE += SCALE_SPEED;
      } else if (e.key == 's' || e.key == 'S') {
        SCALE -= SCALE_SPEED;
      }
      if (e.key == 'i') {
        targetY += 2;
      } else if (e.key == 'k') {
        targetY -= 2;
      } else if (e.key == 'j') {
        targetX -= 2;
      } else if (e.key == 'l') {
        targetX += 2;
      }
      
    }

    
    
    
    window.addEventListener("keydown", keydown, false);
  
  
    CANVAS.addEventListener("mousedown", mouseDown, false); //selama mouse ditekan
    CANVAS.addEventListener("mouseup", mouseUp, false); //selama mouse dilepas
    CANVAS.addEventListener("mouseout", mouseUp, false); //selama mouse keluar dari canvas
    CANVAS.addEventListener("mousemove", mouseMove, false); //selama mouse gerak2
  
    //shaders
    var shader_vertex_source = `
                attribute vec3 position;
                attribute vec3 color;
            
                uniform mat4 PMatrix;
                uniform mat4 VMatrix;
                uniform mat4 MMatrix;
               
                varying vec3 vColor;
                void main(void) {
                gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.);
                vColor = color;
                }`;
    var shader_fragment_source = `
                precision mediump float;
                varying vec3 vColor;
                // uniform vec3 color;
                void main(void) {
                gl_FragColor = vec4(vColor, 1.);
               
                }`;
    var compile_shader = function (source, type, typeString) {
      var shader = GL.createShader(type);
      GL.shaderSource(shader, source);
      GL.compileShader(shader);
      if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert(
          "ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader)
        );
        return false;
      }
      return shader;
    };
  
    var shader_vertex = compile_shader(
      shader_vertex_source,
      GL.VERTEX_SHADER,
      "VERTEX"
    );
    var shader_fragment = compile_shader(
      shader_fragment_source,
      GL.FRAGMENT_SHADER,
      "FRAGMENT"
    );
  
    var SHADER_PROGRAM = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM, shader_vertex);
    GL.attachShader(SHADER_PROGRAM, shader_fragment);
  
    GL.linkProgram(SHADER_PROGRAM);
  
    var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
    var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  
    //uniform
    var _PMatrix = GL.getUniformLocation(SHADER_PROGRAM, "PMatrix"); //projection
    var _VMatrix = GL.getUniformLocation(SHADER_PROGRAM, "VMatrix"); //View
    var _MMatrix = GL.getUniformLocation(SHADER_PROGRAM, "MMatrix"); //Model
  
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
    GL.useProgram(SHADER_PROGRAM);

    // Adjust these values to move the smile to the correct position on the face
    var xOffset = 1;
    var yOffset = 3.6;
    var zOffset = -0.5;

// Adjust this value to scale the smile to the correct size
    var scale = 0.5;
    //Doraemon
    var kepala = generateSphere(1,4,-1,41/255,134/255,204/255,4.17,32);
    var muka = generateSphere(1,3.6,-0.5,1,1,1,3.77,64);
    var kalung = generateSphere(1,0.75,3.1,1,1,0,0.63,32);
    var badan = generateTube(1,-3.5,-1,41/255,134/255,204/255,5,3,2.8,32);
    var perut = generateReverseEllipticParaboloid(1,-1.4,2.98,1,1,1,1.504,1.5,32);
    var pahaKiri = generateTube(-0.3,-5,-1,41/255,134/255,204/255,2,1,1,32);
    var pahaKanan = generateTube(2.5,-5,-1,41/255,134/255,204/255,2,1,1,32);
    // Lengan & Tangan Kanan
    var lenganKanan = generateTube(4.37,-1.5,-1,41/255,134/255,204/255,2.5,1,0.6,32);
    var tanganKanan = generateSphere(4.37,-1.6,-0.5,1,1,1,0.95,32);
    // Lengan & Tangan Kiri 
    var lenganKiri = generateTube(-2.37,-1.5,-1,41/255,134/255,204/255,2.5,1,0.6,32);
    var tanganKiri = generateSphere(-2.37,-1.6,-0.5,1,1,1,0.95,32);
    var kakiKanan = generateDoraemonFoot(2.5,-5.4,-0.55,1,1,1,0.91,32,1.3,1.5);
    var kakiKiri = generateDoraemonFoot(-0.29,-5.4,-0.55,1,1,1,0.91,32,1.3,1.5);
    var mataKanan = generateEllipsoid(1.7, 4.5, 2.25, 1, 1, 1, 1, 1,0.5,32);
    var mataKiri = generateEllipsoid(0.1, 4.5, 2.2, 1, 1, 1, 1, 1,0.55,32);

    var bolaMataKanan = generateSphere(1.7, 4.5, 3, 0, 0, 0, 0.5,32);
    var bolaMataKiri = generateSphere(0.1, 4.5, 3, 0, 0, 0, 0.5,32);

    var bolaMataKanan2 = generateSphere(1.7, 4.45, 3.5, 1, 1, 1, 0.2,32);
    var bolaMataKiri2 = generateSphere(0.1, 4.45, 3.5, 1, 1, 1, 0.2,32);

    var hidung = generateSphere(0.9, 3.95, 3.5, 1, 0, 0, 0.51,32);

    var mulut = generateTorus(1, 3.5, 2.03, 0, 0, 0, 1,1.19,1.5,60);
    
    var garisMulut = generateTube(0.9,1.5,3.03,0,0,0,1.9,0.02,0.02,32);
    var kumis1 = generateBentCuboid(-0.5,3.5,2,0,0,0,5,0.05,100,0,32);
    var kumis2 = generateBentCuboid(-0.5,3,2,0,0,0,5,0.05,100,0,32);
    var kumis3 = generateBentCuboid(-0.5,2.5,2,0,0,0,5,0.05,100,0,32);
    var kumis4 = generateBentCuboid(1.5,3.5,2,0,0,0,6.5,0.05,100,0,32);
    var kumis5 = generateBentCuboid(1.5,3,2,0,0,0,6.5,0.05,100,0,32);
    var kumis6 = generateBentCuboid(1.5,2.5,2,0,0,0,6.5,0.05,100,0,32);
    
    var ekor = generateSphere(0.9, -3.3, -3.9, 1, 0, 0, 0.51,32);

    var kalung2 = generateTorusKalung(0.9, 1.1, -1.3, 1, 0, 0, 3.3,0.1,32,32)

    var bukit1 = generateSphere(-20,-26,1,214/255, 220/255, 227/255,20,22);
    var bukit2 = generateSphere(15,-35,1,214/255, 220/255, 227/255,23,22);
    
    var bulan = generateSphere(20.5,12.8,1,237/255,219/255,173/255,4.5,22);
    var cincin = generateTorusKalung(19.5,12,2,195/255,146/255,79/255,7,0.1,32,32);

    

    //Doraemon
    
    // Create buffers
    
    //Kepala
    var TUBE_VERTEX = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kepala.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORS = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kepala.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kepala.faces),
      GL.STATIC_DRAW
    );

    //Muka
    var TUBE_VERTEXmuka = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXmuka);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(muka.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSmuka = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSmuka);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(muka.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESmuka = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESmuka);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(muka.faces),
      GL.STATIC_DRAW
    );

    //Kalung
    var TUBE_VERTEXkalung = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXkalung);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSkalung = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSkalung);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESkalung = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESkalung);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kalung.faces),
      GL.STATIC_DRAW
    );

    //badan
    var TUBE_FACES2 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(badan.faces),
      GL.STATIC_DRAW
    );
    var TUBE_VERTEX2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(badan.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(badan.colors),
      GL.STATIC_DRAW
    );
    //gendut
    var TUBE_VERTEX3 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX3);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(perut.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS3 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS3);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(perut.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES3 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES3);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(perut.faces),
      GL.STATIC_DRAW
    );
    //kaki kiri
    var TUBE_VERTEX4 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX4);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKiri.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS4 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS4);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES4 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES4);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(pahaKiri.faces),
      GL.STATIC_DRAW
    );
    //kaki kanan
    var TUBE_VERTEX5 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX5);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKanan.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS5 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS5);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES5 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES5);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(pahaKanan.faces),
      GL.STATIC_DRAW
    );

    //Lengan kanan
    var TUBE_VERTEX6 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX6);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKanan.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS6 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS6);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES6 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES6);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lenganKanan.faces),
      GL.STATIC_DRAW
    );

    //Tangan kanan
    var TUBE_VERTEX7 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX7);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKanan.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORS7 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS7);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES7 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES7);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(tanganKanan.faces),
      GL.STATIC_DRAW
    );

    //Lengan kiri
    var TUBE_VERTEX8 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX8);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKiri.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS8 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS8);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES8 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES8);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lenganKiri.faces),
      GL.STATIC_DRAW
    );

    //Tangan kiri
    var TUBE_VERTEX9 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX9);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKiri.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORS9 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS9);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES9 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES9);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(tanganKiri.faces),
      GL.STATIC_DRAW
    );
    //kaki kanan
    var TUBE_VERTEXKAKIKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKanan.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKAKIKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKAKIKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKANAN);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kakiKanan.faces),
      GL.STATIC_DRAW
    );
    //kaki kiri
    var TUBE_VERTEXKAKIKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKiri.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKAKIKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKAKIKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKIRI);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kakiKiri.faces),
      GL.STATIC_DRAW
    );
    //mata Kiri
    var TUBE_VERTEXMATAKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKiri.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSMATAKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESMATAKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKIRI);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mataKiri.faces),
      GL.STATIC_DRAW
    );
    //mata Kanan
    var TUBE_VERTEXMATAKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKanan.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSMATAKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESMATAKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKANAN);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mataKanan.faces),
      GL.STATIC_DRAW
    );

    // bola mata kiri
    var TUBE_VERTEXBOLAMATAKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBOLAMATAKIRI = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKIRI =  GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKiri.faces),
      GL.STATIC_DRAW
    );
    // bola mata kanan
    var TUBE_VERTEXBOLAMATAKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBOLAMATAKANAN = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKANAN =  GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKanan.faces),
      GL.STATIC_DRAW
    );

    // bola mata kiri 2
    var TUBE_VERTEXBOLAMATAKIRI2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri2.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBOLAMATAKIRI2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri2.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKIRI2 =  GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKiri2.faces),
      GL.STATIC_DRAW
    );

    // bola mata kanan 2
    var TUBE_VERTEXBOLAMATAKANAN2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan2.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBOLAMATAKANAN2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan2.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKANAN2 =  GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKanan2.faces),
      GL.STATIC_DRAW
    );
    // HIDUNG
    var TUBE_VERTEXHIDUNG = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXHIDUNG);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(hidung.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSHIDUNG = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSHIDUNG);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(hidung.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESHIDUNG =  GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESHIDUNG);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(hidung.faces),
      GL.STATIC_DRAW
    );

    // mulut senyum
    var TUBE_VERTEXMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMULUT);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulut.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMULUT);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulut.colors),
      GL.STATIC_DRAW
    );

    var TUBE_FACESMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_FACESMULUT);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulut.colors),
      GL.STATIC_DRAW
    );

    //garisMulus
    var TUBE_VERTEXGARISMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXGARISMULUT);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(garisMulut.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSGARISMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSGARISMULUT);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(garisMulut.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESGARISMULUT = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESGARISMULUT);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(garisMulut.faces),
      GL.STATIC_DRAW
    );
    // kumis 1
    var TUBE_VERTEXKUMIS1 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS1);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis1.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS1 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS1);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis1.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS1 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS1);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis1.faces),
      GL.STATIC_DRAW
    );
    // kumis 2
    var TUBE_VERTEXKUMIS2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis2.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis2.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS2 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis2.faces),
      GL.STATIC_DRAW
    );
    // kumis 3
    var TUBE_VERTEXKUMIS3 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS3);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis3.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS3 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS3);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis3.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS3 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS3);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis3.faces),
      GL.STATIC_DRAW
    );
    // kumis 4
    var TUBE_VERTEXKUMIS4 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS4);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis4.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS4 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS4);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis4.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS4 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS4);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis4.faces),
      GL.STATIC_DRAW
    );
    // kumis 5
    var TUBE_VERTEXKUMIS5 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS5);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis5.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS5 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS5);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis5.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS5 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS5);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis5.faces),
      GL.STATIC_DRAW
    );
    // kumis 6
    var TUBE_VERTEXKUMIS6 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS6);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis6.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKUMIS6 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS6);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis6.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS6 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS6);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis6.faces),
      GL.STATIC_DRAW
    );
    // Ekor
    var TUBE_VERTEXEKOR = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXEKOR);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ekor.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSEKOR = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSEKOR);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ekor.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESEKOR = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESEKOR);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(ekor.faces),
      GL.STATIC_DRAW
    );
    // kalung2
    var TUBE_VERTEXKALUNG2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKALUNG2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung2.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKALUNG2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKALUNG2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung2.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKALUNG2 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKALUNG2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kalung2.faces),
      GL.STATIC_DRAW
    );

    //Bukit
    var TUBE_VERTEXBumi = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBumi);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bukit1.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBumi = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBumi);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bukit1.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBumi = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBumi);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bukit1.faces),
      GL.STATIC_DRAW
    );
    //Bukit2
    var TUBE_VERTEXBukit2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBukit2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bukit2.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBukit2 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBukit2);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bukit2.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBukit2 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBukit2);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bukit2.faces),
      GL.STATIC_DRAW
    );

    var TUBE_VERTEXBulan = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBulan);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bulan.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSBulan = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBulan);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bulan.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBulan = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBulan);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bulan.faces),
      GL.STATIC_DRAW
    );

    var TUBE_VERTEXCincin = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXCincin);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(cincin.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSCincin = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSCincin);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(cincin.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESCincin = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESCincin);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(cincin.faces),
      GL.STATIC_DRAW
    );

    
    // Doraemon
    //Dorami
    var kepalaD = generateSphere(1, 3, -1, 1, 0.85, 0, 4.17, 32);
    var mukaD = generateSphere(1, 2.6, -0.3, 1, 1, 1, 3.77, 64);
    // Blush
    var blushKananD = generateCurve(-1., 1.4, 2.4, 1, 0, 0.6, 0.35, 0.9, 32);
    var blushKiriD = generateCurve(3, 1.4, 2.4, 1, 0, 0.6, 0.35, 0.9, 32);
  
    var kalungD = generateSphere(1, -0.6, 2.3, 1, 1, 0, 0.5, 32);
    var badanD = generateTube(1, -4.5, -1, 1, 0.85, 0, 5, 3, 2.8, 32);
    var perutD = generateReverseEllipticParaboloid(1, -2.4, 2.98, 1, 1, 1, 1.454, 1, 32);
    var pahaKiriD = generateTube(-0.3, -6, -1, 1, 0.85, 0, 2, 1, 1, 32);
    var pahaKananD = generateTube(2.5, -6, -1, 1, 0.85, 0, 2, 1, 1, 32);
    // Lengan & Tangan Kanan
    var lenganKananD = generateTube(4.37, -2.4, -1, 1, 0.85, 0, 2.5, 1, 0.6, 32);
    var tanganKananD = generateSphere(4.37, -2.5, -0.5, 1, 1, 1, 0.95, 32);
    // Lengan & Tangan Kiri 
    var lenganKiriD = generateTube(-2.37, -2.4, -1, 1, 0.85, 0, 2.5, 1, 0.6, 32);
    var tanganKiriD = generateSphere(-2.37, -2.5, -0.5, 1, 1, 1, 0.95, 32);
    var kakiKananD = generateDoraemonFoot(2.5, -6.4, -0.55, 1, 1, 1, 0.91, 32, 1.3, 1.5);
    var kakiKiriD = generateDoraemonFoot(-0.29, -6.4, -0.55, 1, 1, 1, 0.91, 32, 1.3, 1.5);
  
  
    var mataKananD = generateEllipsoid(2.15, 3., 2.45, 0.9, 0.9, 0.9, 1, 1, 0.6, 32);
    var mataKiriD = generateEllipsoid(-0.2, 3., 2.4, 0.9, 0.9, 0.9, 1, 1, 0.6, 32);
  
    var bolaMataKananD = generateSphere(2.2, 3., 3.2, 0, 0, 0, 0.6, 32);
    var bolaMataKiriD = generateSphere(-0.3, 3., 3.2, 0, 0, 0, 0.6, 32);
  
    var bolaMataKanan2D = generateSphere(2.1, 2.95, 3.7, 1, 1, 1, 0.25, 32);
    var bolaMataKiri2D = generateSphere(-0.2, 2.95, 3.7, 1, 1, 1, 0.25, 32);
  
  
    var hidungD = generateReverseEllipticParaboloid(1, 1.95, 3.2, 1, 0, 1, 0.7, 0.4, 32);
  
    var mulutD = generateTorus(1, 2.5, 2.207, 0, 0, 0, 1, 1.19, 1.5, 60);
  
    var garisMulutD = generateTube(0.9, 1.5, 3.03, 0, 0, 0, 1.9, 0.02, 0.02, 0);
    var kumis1D = generateBentCuboid(0.98, 3.9, 2.3, 0, 0, 0, 4.4, 0.06, 100, 0, 32);
    var kumis2D = generateBentCuboid(0.98, 3.6, 2.3, 0, 0, 0, 4.8, 0.06, 100, 0, 32);
    var kumis3D = generateBentCuboid(0.98, 3.3, 2.3, 0, 0, 0, 5, 0.06, 100, 0, 32);
  
    // Telinga
    var telingaKananD = generateEllipse(3.25, 6.9, -4.5, 1, 0, 0, 1.7, 2.15, 1, 32);
    var telingaKiriD = generateEllipse(-1.25, 6.9, -4.5, 1, 0, 0, 1.7, 2.15, 1, 32);
    var pitaD = generateEllipse(1, 6.9, -4.5, 1, 0, 0, 2, 1, 1, 32);
    var kalung2D = generateTorusKalung(1, 0, -1.2, 41/255,134/255,204/255, 3.3,0.1,32,32);
  
    var ufo = generateTorusKalung(-20,17,2,0.3,0.3,0.3,3,1,32,32);
    var ufo1 = generateSphere(-21,18.5,0.1,0.8,0.8,0.8,2.3,32);
  
    // Create buffers
    //Kepala
    var TUBE_VERTEXD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kepalaD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kepalaD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESD = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESD);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kepalaD.faces),
      GL.STATIC_DRAW
    );
  
    //Muka
    var TUBE_VERTEXmukaD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXmukaD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mukaD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSmukaD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSmukaD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mukaD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESmukaD = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESmukaD);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mukaD.faces),
      GL.STATIC_DRAW
    );
  
    //Kalung
    var TUBE_VERTEXkalungD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXkalungD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalungD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSkalungD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSkalungD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalungD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESkalungD = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESkalungD);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kalungD.faces),
      GL.STATIC_DRAW
    );
  
    //badan
    var TUBE_FACES2D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES2D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(badanD.faces),
      GL.STATIC_DRAW
    );
    var TUBE_VERTEX2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(badanD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(badanD.colors),
      GL.STATIC_DRAW
    );
    //gendut
    var TUBE_VERTEX3D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX3D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(perutD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS3D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS3D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(perutD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(perutD.faces),
      GL.STATIC_DRAW
    );
    //kaki kiri
    var TUBE_VERTEX4D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX4D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS4D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS4D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES4D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES4D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(pahaKiriD.faces),
      GL.STATIC_DRAW
    );
    //kaki kanan
    var TUBE_VERTEX5D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX5D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS5D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS5D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pahaKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES5D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES5D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(pahaKananD.faces),
      GL.STATIC_DRAW
    );
  
    //Lengan kanan
    var TUBE_VERTEX6D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX6D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS6D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS6D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES6D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES6D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lenganKananD.faces),
      GL.STATIC_DRAW
    );
  
    //Tangan kanan
    var TUBE_VERTEX7D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX7D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS7D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS7D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES7D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES7D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(tanganKananD.faces),
      GL.STATIC_DRAW
    );
  
    //Lengan kiri
    var TUBE_VERTEX8D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX8D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS8D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS8D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(lenganKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES8D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES8D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lenganKiriD.faces),
      GL.STATIC_DRAW
    );
  
    //Tangan kiri
    var TUBE_VERTEX9D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX9D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORS9D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS9D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(tanganKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACES9D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES9D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(tanganKiriD.faces),
      GL.STATIC_DRAW
    );
    //kaki kanan
    var TUBE_VERTEXKAKIKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSKAKIKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKAKIKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKANAND);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kakiKananD.faces),
      GL.STATIC_DRAW
    );
    //kaki kiri
    var TUBE_VERTEXKAKIKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSKAKIKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kakiKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKAKIKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKIRID);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kakiKiriD.faces),
      GL.STATIC_DRAW
    );
    //mata Kiri
    var TUBE_VERTEXMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKIRID);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mataKiriD.faces),
      GL.STATIC_DRAW
    );
    //mata Kanan
    var TUBE_VERTEXMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mataKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKANAND);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mataKananD.faces),
      GL.STATIC_DRAW
    );
  
    // bola mata kiri
    var TUBE_VERTEXBOLAMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSBOLAMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRID);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiriD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKIRID = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRID);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKiriD.faces),
      GL.STATIC_DRAW
    );
    // bola mata kanan
    var TUBE_VERTEXBOLAMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSBOLAMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAND);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKananD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKANAND = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAND);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKananD.faces),
      GL.STATIC_DRAW
    );
  
    // bola mata kiri 2
    var TUBE_VERTEXBOLAMATAKIRI2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri2D.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSBOLAMATAKIRI2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKiri2D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKIRI2D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI2D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKiri2D.faces),
      GL.STATIC_DRAW
    );
  
    // bola mata kanan 2
    var TUBE_VERTEXBOLAMATAKANAN2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan2D.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSBOLAMATAKANAN2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(bolaMataKanan2D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESBOLAMATAKANAN2D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN2D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(bolaMataKanan2D.faces),
      GL.STATIC_DRAW
    );
    // HIDUNG
    var TUBE_VERTEXHIDUNGD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXHIDUNGD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(hidungD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSHIDUNGD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSHIDUNGD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(hidungD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESHIDUNGD = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESHIDUNGD);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(hidungD.faces),
      GL.STATIC_DRAW
    );
  
    // mulut senyum
    var TUBE_VERTEXMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMULUTD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulutD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMULUTD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulutD.colors),
      GL.STATIC_DRAW
    );
  
    var TUBE_FACESMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_FACESMULUTD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(mulutD.colors),
      GL.STATIC_DRAW
    );
  
    //garisMulus
    var TUBE_VERTEXGARISMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXGARISMULUTD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(garisMulutD.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSGARISMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSGARISMULUTD);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(garisMulutD.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESGARISMULUTD = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESGARISMULUTD);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(garisMulutD.faces),
      GL.STATIC_DRAW
    );
    // kumis 1
    var TUBE_VERTEXKUMIS1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis1D.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSKUMIS1 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS1);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis1D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS1D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS1D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis1D.faces),
      GL.STATIC_DRAW
    );
    // kumis 2
    var TUBE_VERTEXKUMIS2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis2D.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSKUMIS2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis2D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS2D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS2D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis2D.faces),
      GL.STATIC_DRAW
    );
    // kumis 3
    var TUBE_VERTEXKUMIS3D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS3D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis3D.vertices),
      GL.STATIC_DRAW
    );
  
    var TUBE_COLORSKUMIS3D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS3D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kumis3D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKUMIS3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kumis3D.faces),
      GL.STATIC_DRAW
    );
  
    //Telinga Kanan
    var telingaKanan1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, telingaKanan1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(telingaKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var telingaKanan2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, telingaKanan2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(telingaKananD.colors),
      GL.STATIC_DRAW
    );
    var telingaKanan3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, telingaKanan3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(telingaKananD.faces),
      GL.STATIC_DRAW
    );
  
    //Telinga Kiri
    var telingaKiri1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, telingaKiri1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(telingaKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var telingaKiri2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, telingaKiri2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(telingaKiriD.colors),
      GL.STATIC_DRAW
    );
    var telingaKiri3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, telingaKiri3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(telingaKiriD.faces),
      GL.STATIC_DRAW
    );
  
    //Pita (tengah tengah telinga)
    var pita1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, pita1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pitaD.vertices),
      GL.STATIC_DRAW
    );
  
    var pita2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, pita2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(pitaD.colors),
      GL.STATIC_DRAW
    );
    var pita3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, pita3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(pitaD.faces),
      GL.STATIC_DRAW
    );
  
    //Blush Kanan
    var blushKanan1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, blushKanan1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(blushKananD.vertices),
      GL.STATIC_DRAW
    );
  
    var blushKanan2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, blushKanan2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(blushKananD.colors),
      GL.STATIC_DRAW
    );
    var blushKanan3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, blushKanan3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(blushKananD.faces),
      GL.STATIC_DRAW
    );
  
    //Blush Kiri
    var blushKiri1D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, blushKiri1D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(blushKiriD.vertices),
      GL.STATIC_DRAW
    );
  
    var blushKiri2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, blushKiri2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(blushKiriD.colors),
      GL.STATIC_DRAW
    );
    var blushKiri3D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, blushKiri3D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(blushKiriD.faces),
      GL.STATIC_DRAW
    );

    // kalung2
    var TUBE_VERTEXKALUNG2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKALUNG2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung2D.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSKALUNG2D = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKALUNG2D);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(kalung2D.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESKALUNG2D = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKALUNG2D);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(kalung2D.faces),
      GL.STATIC_DRAW
    );
    //Dorami
    // GL.vertexAttribPointer(_position, 2, GL.FLOAT, false, 4 * (2 + 3), 0);
    // GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4 * (2 + 3), 2 * 4);
    // GL.drawArrays(GL.LINES, 0, smileCurve.length / 5);
    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(
      40, 
      CANVAS.width / CANVAS.height,
      1,
      100
    );
    var VIEW_MATRIX = LIBS.get_I4();
  
    var MODEL_MATRIX = LIBS.get_I4();
    var kakiKiri_matrix = LIBS.get_I4();
    var kakiKanan_matrix = LIBS.get_I4();
    var tanganKiri_matrix = LIBS.get_I4();
    var tanganKanan_matrix = LIBS.get_I4();
    var bumi_Matrix = LIBS.get_I4();
    var MODEL_MATRIXD = LIBS.get_I4();
    var kakiKiri_matrixD = LIBS.get_I4();
    var kakiKanan_matrixD = LIBS.get_I4();
    var tanganKiri_matrixD = LIBS.get_I4();
    var tanganKanan_matrixD = LIBS.get_I4();
    var planet_Matrix = LIBS.get_I4();
    var ufo_matrix = LIBS.get_I4();
    var ufo1_matrix = LIBS.get_I4();  
    var senyumMatrix = LIBS.get_I4();
    
    LIBS.translateZ(VIEW_MATRIX, -60);
    
  
    /*========================= DRAWING ========================= */
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
  
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
  
    var time_prev = 0;
    var timeKakiKanan = 0;
    var timeTanganKanan = 0;
    var timeKakiKiri = 0;
    var timeTanganKiri = 0;
    var timeGerakan = 0;
    var arahTanganKanan = true;
    var arahKakiKanan = true;
    var arahTanganKiri = true;
    var arahKakiKiri = true;
    var JUMP_HEIGHT = 5.0; // Maximum jump height
    var JUMP_SPEED = 150; // Speed of the jump

    var lompat = false;

    var MAX_ROTATION_ANGLE=90;
    var timeJump = 0; // Time since the start of the jump
    var gerakan = true;
    
        LIBS.set_I4(MODEL_MATRIX);
    var animate = function (time) {
      MODEL_MATRIX = LIBS.get_I4();
      MODEL_MATRIXD = LIBS.get_I4();
      

      // if (timeKaki > 1){
      //     timeKaki = 0;

      // }
      // Create buffers for the vertices and colors
    // var VBO = GL.createBuffer();
    // GL.bindBuffer(GL.ARRAY_BUFFER, VBO);
    // GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(SMILE), GL.STATIC_DRAW);


      
      translateX += (targetX - translateX) * 0.01;
      translateY += (targetY - translateY) * 0.01;
      time *=0.00001;
      if (time > 0) {
        var dt = (time - time_prev);
        // console.log(dt);
        if (!drag) {
          dX *= AMORTIZATION;
          dY *= AMORTIZATION;
          THETA += dX;
          PHI += dY;
          translateX *= AMORTIZATION;
          translateY *= AMORTIZATION;
          translateZ *= AMORTIZATION;
        }

      translateX += (targetX - translateX) * 0.1;
      translateY += (targetY - translateY) * 0.1;
      
        

        
        
        // LIBS.set_I4(MODEL_MATRIX);
        // LIBS.translateZ(VIEW_MATRIX,time)
        LIBS.set_I4(kakiKanan_matrix);
        LIBS.set_I4(tanganKanan_matrix);
        LIBS.set_I4(tanganKiri_matrix);
        LIBS.set_I4(kakiKiri_matrix);
        LIBS.set_I4(bumi_Matrix);
        LIBS.set_I4(planet_Matrix);
        LIBS.set_I4(ufo_matrix);
        LIBS.set_I4(ufo1_matrix);
        LIBS.set_I4(senyumMatrix)
        LIBS.scale(MODEL_MATRIX,SCALE,SCALE,SCALE);
        LIBS.scale(kakiKanan_matrix,SCALE,SCALE,SCALE);
        LIBS.scale(kakiKiri_matrix,SCALE,SCALE,SCALE);
        LIBS.scale(tanganKanan_matrix,SCALE,SCALE,SCALE);
        LIBS.scale(tanganKiri_matrix,SCALE,SCALE,SCALE);
        // LIBS.scale(planet_Matrix,SCALE,SCALE,SCALE);
        LIBS.set_I4(kakiKanan_matrixD);
        LIBS.set_I4(tanganKanan_matrixD);
        LIBS.set_I4(tanganKiri_matrixD);
        LIBS.set_I4(kakiKiri_matrixD);
        LIBS.scale(MODEL_MATRIXD, SCALE, SCALE, SCALE);
        LIBS.scale(kakiKanan_matrixD, SCALE, SCALE, SCALE);
        LIBS.scale(kakiKiri_matrixD, SCALE, SCALE, SCALE);
        LIBS.scale(tanganKanan_matrixD, SCALE, SCALE, SCALE);
        LIBS.scale(tanganKiri_matrixD, SCALE, SCALE, SCALE);

        // LIBS.rotateX(MODEL_MATRIXD, PHI);
        // LIBS.rotateY(MODEL_MATRIXD, THETA);
        // MODEL_MATRIXD = LIBS.get_I4();
        // LIBS.scale(MODEL_MATRIXD, SCALE, SCALE, SCALE);

        LIBS.translateX(MODEL_MATRIX, translateX);
        LIBS.translateY(MODEL_MATRIX, translateY);
        LIBS.translateZ(MODEL_MATRIX, translateZ);
        

        LIBS.translateX(kakiKanan_matrix, translateX);
        LIBS.translateY(kakiKanan_matrix, translateY);
        LIBS.translateZ(kakiKanan_matrix, translateZ);

        LIBS.translateX(kakiKiri_matrix, translateX);
        LIBS.translateY(kakiKiri_matrix, translateY);
        LIBS.translateZ(kakiKiri_matrix, translateZ);

        LIBS.translateX(tanganKanan_matrix, translateX);
        LIBS.translateY(tanganKanan_matrix, translateY);
        LIBS.translateZ(tanganKanan_matrix, translateZ);

        LIBS.translateX(tanganKiri_matrix, translateX);
        LIBS.translateY(tanganKiri_matrix, translateY);
        LIBS.translateZ(tanganKiri_matrix, translateZ);

        LIBS.translateX(MODEL_MATRIXD, translateX);
        LIBS.translateY(MODEL_MATRIXD, translateY);
        LIBS.translateZ(MODEL_MATRIXD, translateZ);

        LIBS.translateX(kakiKanan_matrixD, translateX);
        LIBS.translateY(kakiKanan_matrixD, translateY);
        LIBS.translateZ(kakiKanan_matrixD, translateZ);

        LIBS.translateX(kakiKiri_matrixD, translateX);
        LIBS.translateY(kakiKiri_matrixD, translateY);
        LIBS.translateZ(kakiKiri_matrixD, translateZ);

        LIBS.translateX(tanganKanan_matrixD, translateX);
        LIBS.translateY(tanganKanan_matrixD, translateY);
        LIBS.translateZ(tanganKanan_matrixD, translateZ);

        LIBS.translateX(tanganKiri_matrixD, translateX);
        LIBS.translateY(tanganKiri_matrixD, translateY);
        LIBS.translateZ(tanganKiri_matrixD, translateZ);

        // LIBS.translateX(planet_Matrix, translateX);
        // LIBS.translateY(planet_Matrix, translateX);
        // LIBS.translateZ(planet_Matrix, translateX);




        
        LIBS.rotateX(MODEL_MATRIX, PHI);
        LIBS.rotateY(MODEL_MATRIX, THETA);
        LIBS.rotateX(kakiKanan_matrix, PHI);
        LIBS.rotateY(kakiKanan_matrix, THETA);
        LIBS.rotateX(tanganKanan_matrix, PHI);
        LIBS.rotateY(tanganKanan_matrix, THETA);
        LIBS.rotateX(kakiKiri_matrix, PHI);
        LIBS.rotateY(kakiKiri_matrix, THETA);
        LIBS.rotateX(senyumMatrix,PHI);
        LIBS.rotateY(senyumMatrix,THETA);
        // LIBS.rotateX(planet_Matrix,PHI);
        // LIBS.rotateY(planet_Matrix,THETA);
        //
        LIBS.rotateX(MODEL_MATRIXD, PHI);
        LIBS.rotateY(MODEL_MATRIXD, THETA);
        LIBS.rotateX(tanganKiri_matrix, PHI);
        LIBS.rotateY(tanganKiri_matrix, THETA);
        LIBS.rotateX(kakiKanan_matrixD, PHI);
        LIBS.rotateY(kakiKanan_matrixD, THETA);
        LIBS.rotateX(tanganKanan_matrixD, PHI);
        LIBS.rotateY(tanganKanan_matrixD, THETA);
        LIBS.rotateX(kakiKiri_matrixD, PHI);
        LIBS.rotateY(kakiKiri_matrixD, THETA);
        LIBS.rotateX(tanganKiri_matrixD, PHI);
        LIBS.rotateY(tanganKiri_matrixD, THETA);

    timeJump += dt;

    var y = JUMP_HEIGHT * Math.sin(JUMP_SPEED * timeJump);

    if (y>0) {
      lompat = true;

    }
    if(y<=0 && lompat){
      timeJump = 0;
      lompat = false;
    }
  
    if (y < -0.013) {
        y = 0; 
    }
    
    if(lompat){
      var rotationSpeed = dt * (1 + y / JUMP_HEIGHT) *0.75;

      if(arahKakiKanan){
        timeKakiKanan-= rotationSpeed; 
      } else{
        timeKakiKanan += rotationSpeed;
      }
      if(arahTanganKanan){
        timeTanganKanan-= rotationSpeed; 
      } else{
        timeTanganKanan += rotationSpeed;
      }

      if(arahKakiKiri){
        timeKakiKiri-=rotationSpeed; 
      } else{
        timeKakiKiri += rotationSpeed;
      }
      
      if(arahTanganKiri){
        timeTanganKiri-=rotationSpeed; 
      } else{
        timeTanganKiri += rotationSpeed;
      }

    if (timeTanganKanan < -0.013){
        arahTanganKanan=false;
    } else if(timeTanganKanan>= 0){
        arahTanganKanan= true;
    }

    if (timeTanganKiri < -0.013){
        arahTanganKiri=false;
    } else if(timeTanganKiri>= 0){
        arahTanganKiri= true;
    }
    if (timeKakiKiri < -0.013){
      arahKakiKiri=false;
    }else if(timeKakiKiri>= 0){
      arahKakiKiri= true;
    }
    if (timeKakiKanan < -0.013){
      arahKakiKanan=false;
    }else if(timeKakiKanan>= 0){
      arahKakiKanan= true;
    }


    }
    
      LIBS.translate(MODEL_MATRIX, -20, y, 0);
      LIBS.translate(tanganKanan_matrix, -20, y, 0);
      LIBS.translate(kakiKanan_matrix, -20, y, 0);
      LIBS.translate(kakiKiri_matrix, -20, y, 0);
      LIBS.translate(tanganKiri_matrix, -20,y, 0);
      LIBS.translate(planet_Matrix,0,0,0);
      // LIBS.translate(senyumMatrix,-18.5,y+1,4.5);
     

      

      LIBS.translate(MODEL_MATRIXD, 16, -5.3, 0);
      LIBS.translate(tanganKanan_matrixD, 16, -5.3, 0);
      LIBS.translate(kakiKanan_matrixD, 16, -5.3, 0);
      LIBS.translate(kakiKiri_matrixD, 16, -5.3, 0);
      LIBS.translate(tanganKiri_matrixD, 16, -5.3, 0);
        // // // // LIBS.rotateX(kakiKanan_matrix, LIBS.radToDeg(timeKaki));
        LIBS.rotateZ(kakiKanan_matrix, LIBS.radToDeg(timeKakiKanan)*-0.75);
        // // // // console.log(timeKaki);
        LIBS.rotateZ(tanganKanan_matrix,LIBS.radToDeg(timeTanganKanan*-0.75));
        // // LIBS.translateY(tanganKanan_matrix,timeGerakan*100);
        LIBS.rotateZ(kakiKiri_matrix, LIBS.radToDeg(timeKakiKiri*1));
        LIBS.rotateZ(tanganKiri_matrix, LIBS.radToDeg(timeTanganKiri*1));
        //dorami
        LIBS.rotateX(kakiKanan_matrixD, LIBS.radToDeg(timeKakiKanan) * 0.5);
        LIBS.rotateX(kakiKiri_matrixD, LIBS.radToDeg(timeKakiKiri * -0.5));
        LIBS.rotateX(tanganKanan_matrixD, LIBS.radToDeg(timeTanganKanan * -0.75));
        LIBS.rotateX(tanganKiri_matrixD, LIBS.radToDeg(timeTanganKiri * 1));


        LIBS.rotateY(MODEL_MATRIX, LIBS.radToDeg(time * -1));
        LIBS.rotateY(kakiKanan_matrix, LIBS.radToDeg(time * -1));
        
        LIBS.rotateY(tanganKanan_matrix, LIBS.radToDeg(time * -1));
        
        LIBS.rotateY(kakiKiri_matrix, LIBS.radToDeg(time * -1));
        LIBS.rotateY(tanganKiri_matrix, LIBS.radToDeg(time * -1));
        LIBS.rotateY(senyumMatrix, LIBS.radToDeg(time * -1));
        
        

        //bumi
        LIBS.rotateY(planet_Matrix, LIBS.radToDeg(time * -0.05));
        // LIBS.rotateX(planet_Matrix,LIBS.radToDeg(time * -1));
        LIBS.rotateY(ufo_matrix, LIBS.radToDeg(time * -0.0052));
        LIBS.rotateY(ufo1_matrix, LIBS.radToDeg(time * -0.005));
        // Buat rotasi
        
        LIBS.rotateY(MODEL_MATRIXD, LIBS.radToDeg(time * -1));
        LIBS.rotateY(kakiKanan_matrixD, LIBS.radToDeg(time * -1));
        
        LIBS.rotateY(tanganKanan_matrixD, LIBS.radToDeg(time * -1));
        
        LIBS.rotateY(kakiKiri_matrixD, LIBS.radToDeg(time * -1));
        LIBS.rotateY(tanganKiri_matrixD, LIBS.radToDeg(time * -1));

        
        
        //dorami
        time_prev = time;
        // LIBS.rotateY(planet_Matrix, LIBS.radToDeg(time * -1));
        // LIBS.rotateX(planet_Matrix,LIBS.radToDeg(time * -1));
        // LIBS.rotateY(planet_Matrix, dt*LIBS.degToRad(0.1));
        // LIBS.rotateX(planet_Matrix,dt*LIBS.degToRad(-0.05));
        
      }
  
      GL.viewport(0, 0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      GL.drawElements(GL.TRIANGLES, kepala.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXmuka);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSmuka);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESmuka);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, muka.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXkalung);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSkalung);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESkalung);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kalung.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, badan.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX3);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS3);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES3);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, perut.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX4);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS4);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES4);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.uniformMatrix4fv(_MMatrix, false, kakiKiri_matrix);
      
      
  
      
      
      GL.drawElements(GL.TRIANGLES, pahaKiri.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX5);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS5);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES5);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
    
      GL.uniformMatrix4fv(_MMatrix, false, kakiKanan_matrix);
  
      
      
      GL.drawElements(GL.TRIANGLES, pahaKanan.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX6);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS6);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES6);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      
      GL.uniformMatrix4fv(_MMatrix, false, tanganKanan_matrix);
  
      
      
      GL.drawElements(GL.TRIANGLES, lenganKanan.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX7);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS7);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES7);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      GL.uniformMatrix4fv(_MMatrix, false, tanganKanan_matrix);
  
      
      
      GL.drawElements(GL.TRIANGLES, tanganKanan.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX8);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS8);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES8);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.uniformMatrix4fv(_MMatrix, false, tanganKiri_matrix);
  
      
      
      GL.drawElements(GL.TRIANGLES, lenganKiri.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX9);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS9);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES9);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);

      GL.uniformMatrix4fv(_MMatrix, false, tanganKiri_matrix);
      
      
      GL.drawElements(GL.TRIANGLES, tanganKiri.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKANAN);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKANAN);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKANAN);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      
      
      GL.uniformMatrix4fv(_MMatrix, false, kakiKanan_matrix);
      
      
      GL.drawElements(GL.TRIANGLES, kakiKanan.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKIRI);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKIRI);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKIRI);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, kakiKiri_matrix);
      
      
      GL.drawElements(GL.TRIANGLES, kakiKiri.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKIRI);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKIRI);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKIRI);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, mataKiri.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKANAN);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKANAN);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKANAN);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, mataKanan.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, bolaMataKanan.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, bolaMataKiri.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, bolaMataKanan2.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, bolaMataKiri2.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXHIDUNG);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSHIDUNG);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESHIDUNG);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, hidung.faces.length, GL.UNSIGNED_SHORT, 0);

      
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMULUT);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMULUT);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMULUT);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, mulut.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXGARISMULUT);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSGARISMULUT);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESGARISMULUT);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, garisMulut.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS1);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS1);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS1);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kumis1.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kumis2.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS3);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS3);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS3);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kumis3.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS4);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS4);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS4);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kumis4.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS5);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS5);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS5);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      
      GL.drawElements(GL.TRIANGLES, kumis5.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS6);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS6);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS6);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
      

      GL.drawElements(GL.TRIANGLES, kumis6.faces.length, GL.UNSIGNED_SHORT, 0);



      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXEKOR);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSEKOR);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESEKOR);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      GL.drawElements(GL.TRIANGLES, ekor.faces.length, GL.UNSIGNED_SHORT, 0);
      
      GL.flush();
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKALUNG2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKALUNG2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKALUNG2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIX);
  
      
      GL.drawElements(GL.TRIANGLES, kalung2.faces.length, GL.UNSIGNED_SHORT, 0);

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKALUNG2D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKALUNG2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKALUNG2D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      
      GL.drawElements(GL.TRIANGLES, kalung2D.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBumi);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBumi);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBumi);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, bumi_Matrix);
  
      
      GL.drawElements(GL.TRIANGLES, bukit1.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBukit2);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBukit2);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBukit2);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, bumi_Matrix);
  
      
      GL.drawElements(GL.TRIANGLES, bukit2.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBulan);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBulan);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBulan);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, bumi_Matrix);
      GL.uniformMatrix4fv(_MMatrix, false, planet_Matrix);


  
      
      GL.drawElements(GL.TRIANGLES, bulan.faces.length, GL.UNSIGNED_SHORT, 0);
      
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXCincin);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSCincin);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESCincin);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, bumi_Matrix);
      GL.uniformMatrix4fv(_MMatrix, false, planet_Matrix);
  
      
      GL.drawElements(GL.TRIANGLES, cincin.faces.length, GL.UNSIGNED_SHORT, 0);
      
      
      // GL.vertexAttribPointer(_position, 2, GL.FLOAT, false, 4 * (2 + 3), 0);
      // GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4 * (2 + 3), 2 * 4);
      // GL.drawArrays(GL.LINES, 0, smileCurve.length /5);

      var TUBE_VERTEXufo = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXufo);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ufo.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSufo = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSufo);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ufo.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESufo = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESufo);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(ufo.faces),
      GL.STATIC_DRAW
    );

    var TUBE_VERTEXufo1 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXufo1);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ufo1.vertices),
      GL.STATIC_DRAW
    );
    
    var TUBE_COLORSufo1 = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSufo1);
    GL.bufferData(
      GL.ARRAY_BUFFER,
      new Float32Array(ufo1.colors),
      GL.STATIC_DRAW
    );
    var TUBE_FACESufo1 = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESufo1);
    GL.bufferData(
      GL.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(ufo1.faces),
      GL.STATIC_DRAW
    );
      //dorami
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      GL.drawElements(GL.TRIANGLES, kepalaD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXmukaD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSmukaD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESmukaD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, mukaD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXkalungD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSkalungD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESkalungD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, kalungD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX2D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES2D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, badanD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX3D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS3D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, perutD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX4D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS4D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES4D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      GL.uniformMatrix4fv(_MMatrix, false, kakiKiri_matrixD);
  
  
  
  
  
      GL.drawElements(GL.TRIANGLES, pahaKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX5D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS5D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES5D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
  
      GL.uniformMatrix4fv(_MMatrix, false, kakiKanan_matrixD);
  
  
  
      GL.drawElements(GL.TRIANGLES, pahaKananD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX6D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS6D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES6D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
      GL.uniformMatrix4fv(_MMatrix, false, tanganKanan_matrixD);
  
  
  
      GL.drawElements(GL.TRIANGLES, lenganKananD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX7D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS7D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES7D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      GL.uniformMatrix4fv(_MMatrix, false, tanganKanan_matrixD);
  
  
  
      GL.drawElements(GL.TRIANGLES, tanganKananD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX8D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS8D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES8D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      GL.uniformMatrix4fv(_MMatrix, false, tanganKiri_matrixD);
  
  
  
      GL.drawElements(GL.TRIANGLES, lenganKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEX9D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORS9D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACES9D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
      GL.uniformMatrix4fv(_MMatrix, false, tanganKiri_matrixD);
  
  
      GL.drawElements(GL.TRIANGLES, tanganKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKANAND);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKANAND);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKANAND);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
      GL.uniformMatrix4fv(_MMatrix, false, kakiKanan_matrixD);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKananD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKAKIKIRID);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKAKIKIRID);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKAKIKIRID);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      // GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
      GL.uniformMatrix4fv(_MMatrix, false, kakiKiri_matrixD);
  
  
      GL.drawElements(GL.TRIANGLES, kakiKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKIRID);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKIRID);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKIRID);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, mataKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMATAKANAND);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMATAKANAND);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMATAKANAND);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, mataKananD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAND);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAND);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAND);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, bolaMataKananD.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRID);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRID);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRID);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, bolaMataKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKANAN2D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKANAN2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKANAN2D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, bolaMataKanan2D.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXBOLAMATAKIRI2D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSBOLAMATAKIRI2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESBOLAMATAKIRI2D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, bolaMataKiri2D.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXHIDUNGD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSHIDUNGD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESHIDUNGD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, hidungD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXMULUTD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSMULUTD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESMULUTD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, mulutD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXGARISMULUTD);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSGARISMULUTD);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESGARISMULUTD);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, garisMulutD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS1);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS1D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, kumis1D.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS2D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS2D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, kumis2D.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXKUMIS3D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSKUMIS3D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESKUMIS3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, kumis3D.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, telingaKanan1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, telingaKanan2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, telingaKanan3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, telingaKananD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, telingaKiri1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, telingaKiri2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, telingaKiri3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, telingaKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, pita1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, pita2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, pita3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, pitaD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, blushKanan1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, blushKanan2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, blushKanan3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, blushKananD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //
      GL.bindBuffer(GL.ARRAY_BUFFER, blushKiri1D);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, blushKiri2D);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, blushKiri3D);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, MODEL_MATRIXD);
  
  
  
      GL.drawElements(GL.TRIANGLES, blushKiriD.faces.length, GL.UNSIGNED_SHORT, 0);
  
      //dorami
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXufo);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSufo);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESufo);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, ufo_matrix);
  
      
      GL.drawElements(GL.TRIANGLES, ufo.faces.length, GL.UNSIGNED_SHORT, 0);
      
      

      //
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_VERTEXufo1);
      GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TUBE_COLORSufo1);
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 0, 0);
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TUBE_FACESufo1);
  
      GL.uniformMatrix4fv(_PMatrix, false, PROJECTION_MATRIX);
      GL.uniformMatrix4fv(_VMatrix, false, VIEW_MATRIX);
      GL.uniformMatrix4fv(_MMatrix, false, ufo1_matrix);
  
      GL.drawElements(GL.TRIANGLES, ufo1.faces.length, GL.UNSIGNED_SHORT, 0);
      //
      
      
      
      window.requestAnimationFrame(animate);

    };
  
    animate(0);
  }
  
  window.addEventListener("load", main);