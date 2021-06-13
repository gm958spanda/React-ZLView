
/**
 * 以下来自
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function
 * https://zhuanlan.zhihu.com/p/80852438（图像的仿射变换）
 * https://zhuanlan.zhihu.com/p/78987582 (三维旋转)
 * http://blog.sina.com.cn/s/blog_6163bdeb0102du6p.html(三维错切)
 */ 

/**
 * 4 x 4 矩阵 
    [a1, a2, a3, tx, 
     b1, b2, b3, ty,
     c1, c2, c3, tz,
     0,  0,  0,  1]
 */
export class ZLTransformMatrix3D
{
    /**
     * 矩阵乘点
     * @param matrix 长度16的数组
     * @param point 长度4的数组
     */
    public static multiplyPoint(matrix:number[], point:number[]) : number[]
    {
        // 给矩阵的每一部分一个简单的变量名, 列数（c）与行数（r）
        let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
        let c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
        let c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
        let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
      
        // 定义点坐标
        let x = point[0];
        let y = point[1];
        let z = point[2];
        let w = point[3];
      
        // 点坐标和第一列对应相乘, 再求和
        let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
      
        // 点坐标和第二列对应相乘, 再求和
        let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
      
        // 点坐标和第三列对应相乘, 再求和
        let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
      
        // 点坐标和第四列对应相乘, 再求和
        let resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
      
        return [resultX, resultY, resultZ, resultW]
    }
    /**
     * 矩阵乘矩阵
     */
    public static multiplyMatrix(matrixA:number[],matrixB:number[]) : number[]
    {
        // 将第二个矩阵按列切片
        let column0 = [matrixB[0], matrixB[4], matrixB[8], matrixB[12]];
        let column1 = [matrixB[1], matrixB[5], matrixB[9], matrixB[13]];
        let column2 = [matrixB[2], matrixB[6], matrixB[10], matrixB[14]];
        let column3 = [matrixB[3], matrixB[7], matrixB[11], matrixB[15]];
      
        // 将每列分别和矩阵相乘
        let result0 = this.multiplyPoint(matrixA, column0 );
        let result1 = this.multiplyPoint(matrixA, column1 );
        let result2 = this.multiplyPoint(matrixA, column2 );
        let result3 = this.multiplyPoint(matrixA, column3 );
      
        // 把结果重新组合成矩阵
        return [
          result0[0], result1[0], result2[0], result3[0],
          result0[1], result1[1], result2[1], result3[1],
          result0[2], result1[2], result2[2], result3[2],
          result0[3], result1[3], result2[3], result3[3]
        ];
    }
    /**
     * 平移矩阵
     */
    public static translationMatrix(x:number,y:number,z:number) : number[]
    {
        return [
            1,    0,    0,   x,
            0,    1,    0,   y,
            0,    0,    1,   z,
            0,    0,    0,   1
        ];
    }
    /**
     * 缩放矩阵
     */
    public static scaleMatrix(x:number,y:number,z:number) : number[]
    {
        return  [
            x,    0,    0,   0,
            0,    y,    0,   0,
            0,    0,    z,   0,
            0,    0,    0,   1
        ];
    }
    /**
     * 围绕任意轴旋转矩阵 (弧度)
     */
    public static rotate3D(x:number,y:number,z:number,a:number) : number[]
    {
        let cosa = Math.cos(a);
        let sina = Math.sin(a);
        let xy = x*y;
        let xz = x*z;
        let yz = y*z;
        return [
            cosa+(1-cosa)*x*x,   (1-cosa)*xy-sina*z,   (1-cosa)*xz+sina*y,  0,
            (1-cosa)*xy+sina*z,  cosa+(1-cosa)*y*y,    (1-cosa)*yz-sina*x,  0,
            (1-cosa)*xz-sina*y,  (1-cosa)*yz+sina*x,   cosa+(1-cosa)*z*z,   0,
                    0,                  0,                    0,            1
       ];
    }
    /**
     * 旋转矩阵 (弧度)
     */
    public static rotateAroundX(a:number) : number[]
    {
        let cosa = Math.cos(a);
        let sina = Math.sin(a);
        return [
             1,       0,        0,       0,
             0,     cosa,     -sina,     0,
             0,     sina,      cosa,     0,
             0,       0,        0,       1
        ];
    }
    /**
     * 旋转矩阵 (弧度)
     */
    public static rotateAroundY(a:number) : number[]
    {
        let cosa = Math.cos(a);
        let sina = Math.sin(a);
        return [
            cosa,   0,   sina,    0,
              0,    1,    0,      0,
           -sina,   0,   cosa,    0,
              0,    0,    0,      1
        ];
    }
    /**
     * 旋转矩阵 (弧度)
     */
    public static rotateAroundZ(a:number) : number[]
    {
        let cosa = Math.cos(a);
        let sina = Math.sin(a);
        return [
            cosa, -sina,    0,    0,
            sina,  cosa,    0,    0,
               0,    0,     1,    0,
               0,    0,     0,    1
        ];
    }
    /**
     * 倾斜矩阵 (弧度)
     * @param axy 沿X轴含Y向错切
     * @param axz 沿X轴含Z向错切
     * @param ayx 沿Y轴含X向错切
     * @param ayz 沿Y轴含Z向错切，
     * @param azx 沿Z轴含X向错切
     * @param azy 沿Z轴含Y向错切
     * @returns 
     */
    public static skewMatrix(axy:number , axz:number, ayx:number, ayz:number , azx:number, azy:number) : number[]
    {
        return [        
                1,          Math.tan(ayx),  Math.tan(azx), 0,
            Math.tan(axy),      1,          Math.tan(azy), 0,
            Math.tan(axz),  Math.tan(ayz),         1,      0,
                0,              0,                 0,      1
        ];
    }

    /**
     * 翻转矩阵(镜像)
     */
     public static relectMatrix(x:boolean ,y:boolean, z:boolean)
     {
         return [        
             y===true?-1:0,      0,                0,           0,
                 0,          x===true?-1:0,        0,           0,
                 0,              0,           z===true?-1:0,    0,
                 0,              0,                0,           1
         ];
     }
    /**
     * 单位矩阵。单位阵乘上一个点或者矩阵， 其结果保持不变。
     */
    public static get identityMatrix()  : number[]
    { 
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
}

/**
 * 3 x 3 矩阵
   [a, b, tx, 
    c, d, ty, 
    0, 0, 1]
 */
 export class ZLTransformMatrix2D
 {
    /**
     * 矩阵乘点 (行x列)
     * @param matrix 长度9的数组
     * @param point 长度3的数组
     */
    public static multiplyMatrixAndPoint(matrix:number[], point:number[]) : number[]
    {
        // 给矩阵的每一部分一个简单的变量名, 列数（c）与行数（r）
        let c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2];
        let c0r1 = matrix[3], c1r1 = matrix[4], c2r1 = matrix[5];
        let c0r2 = matrix[6], c1r2 = matrix[7], c2r2 = matrix[8];
    
        // 定义点坐标
        let x = point[0];
        let y = point[1];
        let z = point[2];
    
        // 第1行和点坐标相乘, 再求和
        let resultX = (x * c0r0) + (y * c1r0) + (z * c2r0);
    
        // 第2行和点坐标相乘, 再求和
        let resultY = (x * c0r1) + (y * c1r1) + (z * c2r1);
    
        // 第3行和点坐标相乘, 再求和
        let resultZ = (x * c0r2) + (y * c1r2) + (z * c2r2);
    
        return [resultX, resultY, resultZ]
    }
    /**
     * 矩阵乘矩阵 (行x列)
     */
    public static multiplyMatrix(matrixA:number[],matrixB:number[]) : number[]
    {
        // 将第二个矩阵按列切片
        let column0 = [matrixB[0], matrixB[3], matrixB[6]];
        let column1 = [matrixB[1], matrixB[4], matrixB[7]];
        let column2 = [matrixB[2], matrixB[5], matrixB[8]];
    
        // 将每列分别和矩阵相乘
        let result0 = this.multiplyMatrixAndPoint(matrixA, column0 );
        let result1 = this.multiplyMatrixAndPoint(matrixA, column1 );
        let result2 = this.multiplyMatrixAndPoint(matrixA, column2 );

        // 把结果重新组合成矩阵
        return [
        result0[0], result1[0], result2[0],
        result0[1], result1[1], result2[1],
        result0[2], result1[2], result2[2],
        ];
    }
    /**
     * 平移矩阵
     */
    public static translationMatrix(x:number,y:number) : number[]
    {
        return [
            1,    0,    x,
            0,    1,    y,
            0,    0,    1
        ];
    }
    /**
     * 缩放矩阵
     */
    public static scaleMatrix(x:number,y:number) : number[]
    {
        return  [
            x,    0,    0,
            0,    y,    0,
            0,    0,    1
        ];
    }
    /**
     * (沿着Z轴)旋转矩阵 (弧度)
     */
    public static rotateMatrix(a:number) : number[]
    {
        let cosa = Math.cos(a);
        let sina = Math.sin(a);
        return [        
            cosa,  -sina,   0,
            sina,   cosa,   0,
            0,      0,      1
        ];
    }
    /**
     * 倾斜矩阵 (弧度)
     */
    public static skewMatrix(ax:number ,ay:number) : number[]
    {
        return [        
                1,       Math.tan(ax), 0,
            Math.tan(ay),   1,         0,
                0,          0,         1
        ];
    }
    /**
     * 翻转矩阵(镜像)
     */
    public static relectMatrix(x:boolean ,y:boolean)
    {
        return [        
            y===true?-1:0,      0,           0,
                0,          x===true?-1:0,   0,
                0,              0,           1
        ];
    }
    public static toMatrix3D(matrix2d:number[]) : number[]
    {
        return [
            matrix2d[0],matrix2d[1],0,matrix2d[2],
            matrix2d[3],matrix2d[4],0,matrix2d[5],
                0,          0,      1,     0,
                0,          0,      0,      1
        ];
    }
    /**
     * 单位矩阵。单位阵乘上一个点或者矩阵， 其结果保持不变。
     */
    public static get identityMatrix()  : number[]
    {  
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }
}