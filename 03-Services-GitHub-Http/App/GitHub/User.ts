﻿module App.GitHub {

    export class User implements IUser {
        login: string;
        id: number;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type1: string;
        site_admin: boolean;
        name: string;
        company: string;
        blog: string;
        location: string;
        email: string;
        hireable: any;
        bio: any;
        public_repos: number;
        public_gists: number;
        followers: number;
        following: number;
        created_at: Date;
        updated_at: Date;

        constructor(name: string, login: string) {
            this.name = "name1";
            this.login = "login1";
        }
    }
}