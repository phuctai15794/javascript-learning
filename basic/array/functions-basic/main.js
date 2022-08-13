var languages = [
    'Javascript',
    'PHP',
    'Ruby',
    'Laravel',
    'NodeJs'
];

console.log(languages);
console.log('toString (Convert array to string): ', languages.toString());
console.log('join (Convert array to string by character): ', languages.join(', '));
console.log('pop (Get and Delete last item): Deleted item => ', languages.pop());
console.log('shift (Get and Delete first item): Deleted item => ', languages.shift());
languages.push('Golang', 'ReactJs');
console.log('push (Add item(s) to last array): Add (\'Golang\', \'ReactJs\'), Result => ', languages.join(', '));
languages.unshift('Angular', 'VueJs', 'VueJs', 'VueJs');
console.log('unshift (Add item(s) to first array): Add (\'Angular\', \'VueJs\', \'VueJs\', \'VueJs\'), Result => ', languages.join(', '));
console.log('splice (Removing or replacing existing items and/or adding new items)');
console.log('splice (Removing item: Angular)');
languages.splice(0, 1);
console.log(languages.join(', '));
console.log('splice (Replacing 2 item: VueJs => Vue JS)');
languages.splice(0, 2, 'Vue JS');
console.log(languages.join(', '));
console.log('splice (Adding 2 item: TypeScript, Babel)');
languages.splice(2, 0, 'TypeScript', 'Babel');
console.log(languages.join(', '));