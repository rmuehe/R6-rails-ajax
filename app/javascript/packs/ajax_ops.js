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
  const members_path = 'http://localhost:3001/api/v1/members';
  const deleteMemberButton = document.getElementById('delete-member');
  const deleteMemberID = document.getElementById('member-id-delete');
  const listFactsButton = document.getElementById('list-facts');
  const factsMemberID = document.getElementById('member-id-facts');
  const createFactButton = document.getElementById('create-fact');
  const fact = document.getElementById('fact');
  const likes = document.getElementById('likes');
  const updateFactButton = document.getElementById('update-fact-btn');
  const factID = document.getElementById('fact-id-update');
  const updateFactMemberID = document.getElementById('member-id-update-fact');
  const likesUpdate = document.getElementById('update-likes');
  const factUpdate = document.getElementById('update-fact');
  const deleteFactButton = document.getElementById('delete-fact');
  const deleteFactID = document.getElementById('fact-id-delete');
  const deleteFact_MemberID = document.getElementById('member-id-delete-fact');


  restOpsDiv.addEventListener('click', (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path,
          {  headers: { 'Content-Type': 'application/json',
          'authorization': authHeader } }
        ).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
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
        { method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
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
      fetch(`${members_path}/${memberID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
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
    } else if (event.target === deleteMemberButton) {
      fetch(`${members_path}/${deleteMemberID.value}`,
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader }
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
    } else if (event.target === listFactsButton) {
      fetch(`${members_path}/${factsMemberID.value}/facts`,
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
            for (let i = 0; i < data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createFactButton) {
      var dataObject = {
        fact_text: fact.value,
        likes: likes.value
      }
      fetch(`${members_path}/${factsMemberID.value}/facts`,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
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
    } else if (event.target === updateFactButton) {
      var dataObject = {
        fact_text: factUpdate.value,
        likes: likesUpdate.value
      }
      fetch(`${members_path}/${updateFactMemberID.value}/facts/${factID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
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
    } else if (event.target === deleteFactButton) {
      // fetch(`${members_path}/${deleteFactID.value}`,
      fetch(`${members_path}/${deleteFact_MemberID.value}/facts/${deleteFactID.value}`,
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader }
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
    }
  });
}
document.addEventListener('DOMContentLoaded', handle_ajax(event));
