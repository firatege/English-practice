                                 // *****************************  DATABASE SCHEMA  ***************************** //
export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    role_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Role {
    role_id: number;
    role_name: string;
}

export interface Word {
    word_id: number;
    word: string;
    created_at: Date;
}

export interface CustomWord {
    custom_word_id: number;
    word: string;
    user_id: number;
    created_at: Date;
}

export interface UserWord {
    user_word_id: number;
    user_id: number;
    word_id?: number;
    custom_word_id?: number;
    added_at: Date;
}

export interface WordDetail {
    word_detail_id: number;
    word_id?: number;
    custom_word_id?: number;
    synonym: string;
    example: string;
    created_at: Date;
}

export interface Session {
    session_id: number;
    user_id: number;
    start_time: Date;
    end_time?: Date;
}

export enum ResultType {
    CORRECT = 'correct',
    INCORRECT = 'incorrect',
    SKIPPED = 'skipped'
}

export interface SessionResult {
    session_result_id: number;
    session_id: number;
    word_id?: number;
    custom_word_id?: number;
    result: ResultType;
    answered_at: Date;
}

export interface SessionStats {
    session_stat_id: number;
    session_id: number;
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
    skipped_questions: number;
    total_time: number;
}

export interface UserStats {
    user_stat_id: number;
    user_id: number;
    total_sessions: number;
    total_questions: number;
    total_correct: number;
    total_incorrect: number;
    total_skipped: number;
    average_time_per_session: number;
}

export interface Report {
    report_id: number;
    user_id: number;
    report_text: string;
    created_at: Date;
}