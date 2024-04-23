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

function solve(A, B, C, D, E, F) {
    let vis = Array.from({ length: A + 1 }, () => Array(B + 1).fill(0));
    table.innerHTML = '';
    //table filling
    for (let i = 0; i <= A; i++) { 
        const row = table.insertRow(); 
        for (let j = 0; j <= B; j++) { 
            const cell = row.insertCell(); 
            cell.textContent = "0";
            cell.id= `id_${i}_${j}`;
            cell.style.width = '20px';
            cell.style.height = '20px'
        }
    }
    //marking all circle
    for (let i = 0; i < C; i++) {
        if(E[i]>=A || F[i]>=B)continue;
        bfs_vis(E[i], F[i], D, vis);
    }
 
    let ans = bfs_check(A, B, vis); 
    return ans ? "YES" : "NO";
}
 

function generateMatrix() {
    // Get the values of A ,B,C,D,E,F
    const A = parseInt(document.getElementById('A').value);
    const B = parseInt(document.getElementById('B').value);
    const C = document.getElementById('C').value, D = document.getElementById('D').value;
    let E=[];
    let F=[]; 
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
    const result = solve(A, B, C, D, E, F); 
   // console.log("Result:", result);  
}