const table = document.getElementById('matrix'); 


function bfs_vis(i, j, r, vis) {
    const mov = [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 1], [-1, -1], [-1, 0]];
    const n = vis.length, m = vis[0].length;
    const temp = Array.from({ length: n }, () => Array(m).fill(0));
    const qq = [];
    qq.push([i, j]);
    document.getElementById(`id_${i}_${j}`).textContent=`${i}.${j}`;
    vis[i][j] = 1;
    temp[i][j] = 1;
    while (qq.length > 0) {
        const [x, y] = qq.shift();
        for (const [p, q] of mov) {
            const dx = p + x;
            const dy = q + y;
            const dis = (Math.abs(dx - i) ** 2 + Math.abs(dy - j) ** 2);
            if (dx >= 0 && dx < n && dy >= 0 && dy < m && (dis <= r * r) && temp[dx][dy] === 0) {
                qq.push([dx, dy]);
                let ff=`id_${dx}_${dy}`; 
                let cell=document.getElementById(ff)
                cell.textContent="1";
                cell.style.backgroundColor = 'red';
                vis[dx][dy] = 1;
                temp[dx][dy] = 1;
            }
        }
    }
}

function bfs_check(si, sj, vis) {
    const mov = [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 1], [-1, -1], [-1, 0]];
    const n = vis.length, m = vis[0].length;
    const qq = [];
    qq.push([0, 0]);
    if (vis[0][0] === 1){alert("no valid path"); return false;}

    async function myfun()
    {
        while (qq.length > 0) {
            const [x, y] = qq.shift();
            for (const [p, q] of mov) {
                const dx = p + x;
                const dy = q + y;
                if (dx >= 0 && dx < n && dy >= 0 && dy < m && vis[dx][dy] === 0) {
                    vis[dx][dy] = 2;
                    let ff=`id_${dx}_${dy}`;
                    let cell=document.getElementById(ff);
                    if (cell) { 
                       cell.textContent = "2";
                       cell.style.backgroundColor = 'green';
                    } else {
                        //when dx and dy out of bound
                        //console.log(`${dx} ${dy}`);
                       // console.log("Cell not found!");
                    }
                    qq.push([dx, dy]);
                    if (dx === si && dy === sj){alert("valid path"); return true;}
                }
            }
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        alert("no valid path");
        return false;
    }
    myfun();
}
let flag=0;

function dfs_check(i,j,vis)
{
    if(!flag){
        async function myfun()
        {
        if(i<0||j<0||i>=vis.length||j>=vis[0].length||vis[i][j]!=0)return ;
        let ff=`id_${i}_${j}`;
        let cell=document.getElementById(ff);
        cell.textContent = "2";
        cell.style.backgroundColor = 'green';
        vis[i][j]=2;
        if (i === vis.length-1 && j === vis[0].length-1){alert("valid path"); flag=1;}
        for(let a=1;a>=-1;a--)
        {
            for(let b=1;b>=-1;b--)
            {
                await new Promise(resolve => setTimeout(resolve, 100));
                dfs_check(i+a,j+b,vis);
            } 
        }
        }
        myfun();

    }
}

function solve(A, B, C, D, E, F,algo) {
    let vis = Array.from({ length: A + 1 }, () => Array(B + 1).fill(0));
    table.innerHTML = '';
    //table filling
    for (let i = 0; i <= A; i++) { 
        const row = table.insertRow(); 
        for (let j = 0; j <= B; j++) { 
            const cell = row.insertCell(); 
            cell.textContent = "0";
            cell.id= `id_${i}_${j}`;
            cell.style.width = '3px';
            cell.style.height = '3px';
            cell.style.fontSize = '5px';
        }
    }
    //marking all circle
    for (let i = 0; i < C; i++) {
        if(E[i]>=A || F[i]>=B)continue;
        bfs_vis(E[i], F[i], D, vis);
    }
 
    let ans = ((algo) ? (dfs_check(0,0, vis)) : (bfs_check(A,B,vis))); 
    return ans ? "YES" : "NO";
}
 

function generateMatrix() {
    // Get the values of A ,B,C,D,E,F
    const A = parseInt(document.getElementById('A').value);
    const B = parseInt(document.getElementById('B').value);
    const C = document.getElementById('C').value, D = document.getElementById('D').value;
    let E=[];
    let F=[]; 
    flag=0;
    for(let i=0;i<A;i++)
    {
        let temp=Math.floor(Math.random()*A);
        E.push(temp);
    }
    for(let i=0;i<B;i++)
    {
        let temp=Math.floor(Math.random()*B);
        F.push(temp);
    }
    let algo=((document.getElementsByName("algo"))[0].checked) ? 1 : 0;
    const result = solve(A, B, C, D, E, F,algo); 
   // console.log("Result:", result);  
}
 