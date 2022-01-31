function handle_ajax(event) {
  console.log('DOM fully loaded and parsed');
  const authHeader = localStorage.getItem("authHeader");
  const resultsDiv = document.getElementById('results-div');
  const restOpsDiv = document.getElementById('rest-ops');
  const listMembersButton = document.getElementById('list-members');
  const createMemberButton = document.getElementById('create-member');
  const firstName = document.getElementById('member-firstName');
  const lastName = document.getElementById('member-lastName');
  const updateMemberButton = document.getElementById('update-member');
  const memberID = document.getElementById('member-id');
  const firstName1 = document.getElementById('member-firstName1');
  const lastName1 = document.getElementById('member-lastName1');
  const memberToDelete = document.getElementById("member-to-delete")
  const deleteMember = document.getElementById('delete-member')
  const memberForFactList = document.getElementById('member-for-fact-list')
  const listFacts = document.getElementById('list-facts')
  const memberForFactAdd = document.getElementById('member-for-fact-add')
  const factText = document.getElementById('fact-text')
  const factLikes = document.getElementById('fact-likes')
  const createFact = document.getElementById('create-fact')
  const memberForFactUpdate = document.getElementById('member-for-fact-update')
  const factForUpdate = document.getElementById('fact-for-update')
  const factText1 = document.getElementById('fact-text1')
  const factLikes1 = document.getElementById('fact-likes1')
  const updateFact = document.getElementById('update-fact')
  const memberForFactDelete = document.getElementById('member-for-fact-delete')
  const factForDelete = document.getElementById('fact-for-delete')
  const deleteFact = document.getElementById('delete-fact')
  const members_path = 'http://localhost:3001/api/v1/members';
  restOpsDiv.addEventListener('click', async (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': authHeader
          }
        }
      ).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            if (data.length === 0) {
              let parag = document.createElement('P')
              parag.textContent = "There are no members."
              resultsDiv.appendChild(parag)
            } else {
              for (let i = 0; i < data.length; i++) {
                let parag = document.createElement('P');
                parag.textContent = JSON.stringify(data[i]);
                resultsDiv.appendChild(parag);
              }
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value
      }
      fetch(members_path,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': authHeader
          },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value
      }
      if (!dataObject.first_name) {
        delete dataObject.first_name
      }
      if (dataObject.last_name) {
        delete dataObject.last_name
      } 
      fetch(`${members_path}/${memberID.value}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': authHeader
          },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === deleteMember) {
      try {
        const response = await fetch(`${members_path}/${memberToDelete.value}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader
            }
          })
        const data = await response.json()
        if (response.status === 200) {
          resultsDiv.innerHTML = ''
          let parag = document.createElement('P')
          parag.textContent = JSON.stringify(data)
          resultsDiv.appendChild(parag);
        } else {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else if (event.target === listFacts) {
      try {
        const response = await fetch(`${members_path}/${memberForFactList.value}/facts`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader
            }
          })
        const data = await response.json()
        if (response.status === 200) {
          resultsDiv.innerHTML = ''
          if (data.length === 0) {
            let parag = document.createElement('P')
            parag.textContent = "There are no facts for this member."
            resultsDiv.appendChild(parag)
          } else {
            for (let i = 0; i < data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          }
        } else {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else if (event.target === createFact) {
      try {
        var dataObject = { fact_text: factText.value, likes: factLikes.value }
        const response = await fetch(`${members_path}/${memberForFactAdd.value}/facts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader
            },
            body: JSON.stringify(dataObject)
          })
        const data = await response.json()
        if (response.status === 201) {
          resultsDiv.innerHTML = ''
          let parag = document.createElement('P')
          parag.textContent = JSON.stringify(data)
          resultsDiv.appendChild(parag);
        } else {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else if (event.target === updateFact) {
      try {
        var dataObject = { fact_text: factText1.value, likes: factLikes1.value }
        if (!dataObject.fact_text) {
          delete dataObject.fact_text
        }
        if (!(dataObject.likes===0) && !dataObject.likes) {
          delete dataObject.likes
        }
        const response = await fetch(`${members_path}/${memberForFactUpdate.value}/facts/${factForUpdate.value}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader
            },
            body: JSON.stringify(dataObject)
          })
        const data = await response.json()
        if (response.status === 200) {
          resultsDiv.innerHTML = ''
          let parag = document.createElement('P')
          parag.textContent = JSON.stringify(data)
          resultsDiv.appendChild(parag);
        } else {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else if (event.target === deleteFact) {
      try {
        const response = await fetch(`${members_path}/${memberForFactDelete.value}/facts/${factForDelete.value}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader
            }
          })
        const data = await response.json()
        if (response.status === 200) {
          resultsDiv.innerHTML = ''
          let parag = document.createElement('P')
          parag.textContent = JSON.stringify(data)
          resultsDiv.appendChild(parag);
        } else {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', handle_ajax(event));
