export async function fetchSampleUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const users = await res.json();

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];

    } finally {
        console.log("Fetch users request completed");
    }
}

export function fetchSampleUsersPromise() {


    return fetch("https://jsonplaceholder.typicode.com/users")
    .then (res => { 
    if (!res.ok) { 
        throw new Error (`HTTP Error: ${res.status}`);

    }

    return res.json();

})
    
    .then(users => {
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
    })


 .catch (error => { 
        console.error("Failed to fetch users:", error);
        return[];
 })

 .finally (() =>  { 
        console.log("Fetch users request completed");

    });

}